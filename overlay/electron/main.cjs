'use strict';

/**
 * MokaTroy Overlay — Electron main process.
 *
 * Design notes:
 *  - The window is frameless + transparent + always-on-top so it can float over
 *    the game (Riot's client only lets a normal window draw on top when the game
 *    runs in Borderless/Windowed mode).
 *  - Click-through is ON by default: the game keeps receiving every click. A
 *    global hotkey toggles "interactive" mode for mouse use, and number hotkeys
 *    pick a comp without ever focusing the overlay.
 *  - Nothing here reads game memory, injects code or touches the game process:
 *    it only checks whether `League of Legends.exe` is running (the TFT client)
 *    so the overlay can appear/disappear with the game.
 */

const path = require('node:path');
const fs = require('node:fs');
const { execFile } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  globalShortcut,
  ipcMain,
  nativeImage,
  net,
  protocol,
  screen,
  shell,
} = require('electron');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const ICON_DIR = path.join(ROOT, 'build');
const DEV = process.argv.includes('--dev');
const DEV_URL = process.env.OVERLAY_DEV_URL || 'http://localhost:3200';

const DEFAULTS = {
  x: null,
  y: null,
  width: 416,
  height: 640,
  opacity: 0.95,
  scale: 1,
  locale: 'ar',
  clickThrough: false,
  autoShow: true,
  visible: false,
};

const HOTKEYS = {
  toggle: 'Control+Shift+O',
  interactive: 'Control+Shift+L',
  pick: (index) => `Control+Shift+${index + 1}`,
};

const PICK_SLOTS = 6;

let win = null;
let tray = null;
let settings = { ...DEFAULTS };
let gameTimer = null;
let gameRunning = false;
let autoShown = false;
let quitting = false;
const hotkeyErrors = [];

/* ------------------------------------------------------------------ settings */

function settingsFile() {
  return path.join(app.getPath('userData'), 'settings.json');
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function loadSettings() {
  try {
    const raw = JSON.parse(fs.readFileSync(settingsFile(), 'utf8'));
    return { ...DEFAULTS, ...raw };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveSettings() {
  try {
    fs.mkdirSync(path.dirname(settingsFile()), { recursive: true });
    fs.writeFileSync(settingsFile(), JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('[overlay] could not persist settings:', error);
  }
}

function applySettingsPatch(patch) {
  if (patch && typeof patch.opacity === 'number') {
    settings.opacity = clamp(patch.opacity, 0.4, 1);
  }
  if (patch && typeof patch.scale === 'number') {
    settings.scale = clamp(patch.scale, 0.8, 1.4);
  }
  if (patch && ['ar', 'en', 'ja'].includes(patch.locale)) {
    settings.locale = patch.locale;
  }
  if (patch && typeof patch.autoShow === 'boolean') {
    settings.autoShow = patch.autoShow;
  }
  if (patch && typeof patch.clickThrough === 'boolean') {
    setClickThrough(patch.clickThrough, { save: false });
  }
  if (win && !win.isDestroyed()) win.setOpacity(settings.opacity);
  saveSettings();
  return publicSettings();
}

function publicSettings() {
  return {
    opacity: settings.opacity,
    scale: settings.scale,
    locale: settings.locale,
    clickThrough: settings.clickThrough,
    autoShow: settings.autoShow,
    visible: Boolean(win && !win.isDestroyed() && win.isVisible()),
    x: settings.x,
    y: settings.y,
    width: settings.width,
    height: settings.height,
  };
}

function send(command) {
  if (win && !win.isDestroyed()) win.webContents.send('overlay:command', command);
}

/* -------------------------------------------------------------------- window */

function initialBounds() {
  const area = screen.getPrimaryDisplay().workArea;
  const width = clamp(settings.width, 320, 900);
  const height = clamp(settings.height, 380, area.height);
  const fallbackX = area.x + area.width - width - 24;
  const fallbackY = area.y + Math.round(area.height * 0.08);
  const x = typeof settings.x === 'number' ? clamp(settings.x, area.x - width + 80, area.x + area.width - 80) : fallbackX;
  const y = typeof settings.y === 'number' ? clamp(settings.y, area.y, area.y + area.height - 80) : fallbackY;
  return { x, y, width, height };
}

function createWindow() {
  const bounds = initialBounds();

  win = new BrowserWindow({
    ...bounds,
    title: 'MokaTroy Overlay',
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    hasShadow: false,
    resizable: true,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: false,
    roundedCorners: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      backgroundThrottling: false,
      devTools: true,
    },
  });

  // 'screen-saver' keeps the overlay above fullscreen/borderless game windows.
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setOpacity(settings.opacity);

  win.once('ready-to-show', () => {
    if (settings.visible) {
      showOverlay({ interactive: !settings.clickThrough });
    }
  });

  const persistBounds = debounce(() => {
    if (!win || win.isDestroyed() || win.isMinimized()) return;
    const [x, y] = win.getPosition();
    const [width, height] = win.getSize();
    settings.x = x;
    settings.y = y;
    settings.width = width;
    settings.height = height;
    saveSettings();
  }, 400);

  win.on('move', persistBounds);
  win.on('resize', persistBounds);

  win.on('close', (event) => {
    if (quitting) return;
    event.preventDefault();
    hideOverlay();
  });

  win.on('show', () => {
    settings.visible = true;
    saveSettings();
  });

  win.on('hide', () => {
    settings.visible = false;
    saveSettings();
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (DEV) {
    win.loadURL(DEV_URL);
  } else {
    win.loadURL('app://tftacademy/index.html');
  }
}

function showOverlay({ interactive = false, focus = false } = {}) {
  if (!win || win.isDestroyed()) return;
  setClickThrough(!interactive, { save: false });
  settings.visible = true;
  saveSettings();
  if (focus && interactive) {
    win.show();
    win.focus();
  } else {
    win.showInactive();
  }
  win.setAlwaysOnTop(true, 'screen-saver');
  send({ type: 'shown', interactive });
  refreshTrayMenu();
}

function hideOverlay() {
  if (!win || win.isDestroyed()) return;
  win.hide();
  settings.visible = false;
  saveSettings();
  send({ type: 'hidden' });
  refreshTrayMenu();
}

function toggleOverlay() {
  if (!win || win.isDestroyed()) return;
  if (win.isVisible()) {
    hideOverlay();
  } else {
    autoShown = false;
    showOverlay({ interactive: !settings.clickThrough });
  }
}

function setClickThrough(value, { save = true } = {}) {
  settings.clickThrough = Boolean(value);
  if (win && !win.isDestroyed()) {
    // forward:true keeps mouse-move events flowing so hover hints still work.
    win.setIgnoreMouseEvents(settings.clickThrough, { forward: true });
  }
  if (save) saveSettings();
  send({ type: 'clickthrough', value: settings.clickThrough });
  refreshTrayMenu();
}

function toggleClickThrough() {
  const next = !settings.clickThrough;
  setClickThrough(next);
  // When turning interaction back ON, always show + focus so the user is not stuck.
  if (!next) {
    showOverlay({ interactive: true, focus: true });
  }
}

function resetPosition() {
  if (!win || win.isDestroyed()) return;
  settings.x = null;
  settings.y = null;
  win.setSize(clamp(settings.width || DEFAULTS.width, 320, 900), clamp(settings.height || DEFAULTS.height, 380, 1200));
  const bounds = initialBounds();
  win.setPosition(bounds.x, bounds.y);
  settings.x = bounds.x;
  settings.y = bounds.y;
  saveSettings();
}

function debounce(fn, wait) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

/* ------------------------------------------------------------------ shortcut */

function registerHotkeys() {
  const bind = (accelerator, handler) => {
    const ok = globalShortcut.register(accelerator, handler);
    if (!ok) hotkeyErrors.push(accelerator);
  };

  bind(HOTKEYS.toggle, toggleOverlay);
  bind(HOTKEYS.interactive, toggleClickThrough);
  for (let index = 0; index < PICK_SLOTS; index += 1) {
    bind(HOTKEYS.pick(index), () => {
      if (!win || win.isDestroyed()) return;
      if (!win.isVisible()) showOverlay({ interactive: !settings.clickThrough });
      send({ type: 'select-comp', index });
    });
  }
}

/* -------------------------------------------------------------- game watcher */

function pollGame() {
  // TFT runs inside "League of Legends.exe" (Riot's in-game client process).
  execFile(
    'tasklist',
    ['/FI', 'IMAGENAME eq League of Legends.exe', '/NH'],
    { windowsHide: true, timeout: 4000 },
    (error, stdout) => {
      if (error && !stdout) return;
      const running = /league of legends\.exe/i.test(stdout || '');
      if (running === gameRunning) return;
      gameRunning = running;
      send({ type: 'game', running });
      if (!settings.autoShow) return;
      if (running && win && !win.isDestroyed() && !win.isVisible()) {
        autoShown = true;
        showOverlay({ interactive: false });
      } else if (!running && autoShown) {
        autoShown = false;
        hideOverlay();
      }
    },
  );
}

function startGameWatcher() {
  if (process.platform !== 'win32') {
    // Documented limitation: process detection needs tasklist (Windows only).
    return;
  }
  pollGame();
  gameTimer = setInterval(pollGame, 4000);
}

/* ---------------------------------------------------------------------- tray */

function trayImage() {
  const file = path.join(ICON_DIR, 'tray.png');
  const image = nativeImage.createFromPath(file);
  return image.isEmpty() ? nativeImage.createEmpty() : image;
}

function refreshTrayMenu() {
  if (!tray) return;
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: (win && win.isVisible() ? 'إخفاء الاوفرلاي' : 'إظهار الاوفرلاي') + '   (Ctrl+Shift+O)',
        click: toggleOverlay,
      },
      {
        label: 'مرور النقر للّعبة   (Ctrl+Shift+L)',
        type: 'checkbox',
        checked: settings.clickThrough,
        click: (item) => setClickThrough(item.checked),
      },
      {
        label: 'يظهر تلقائيًا مع اللعبة',
        type: 'checkbox',
        checked: settings.autoShow,
        click: (item) => {
          settings.autoShow = item.checked;
          saveSettings();
          refreshTrayMenu();
        },
      },
      { type: 'separator' },
      { label: 'إعادة ضبط الموضع', click: resetPosition },
      {
        label: 'خروج',
        click: () => {
          quitting = true;
          app.quit();
        },
      },
    ]),
  );
}

function createTray() {
  try {
    tray = new Tray(trayImage());
    tray.setToolTip('MokaTroy Overlay');
    tray.on('click', toggleOverlay);
    refreshTrayMenu();
  } catch (error) {
    console.error('[overlay] tray unavailable:', error);
  }
}

/* ----------------------------------------------------------------------- IPC */

ipcMain.handle('overlay:bootstrap', () => ({
  settings: publicSettings(),
  version: app.getVersion(),
  platform: process.platform,
  game: gameRunning,
  hotkeyErrors: [...hotkeyErrors],
  gameDetection: process.platform === 'win32',
}));

ipcMain.on('overlay:update', (_event, patch) => {
  applySettingsPatch(patch || {});
});

ipcMain.on('overlay:hide', () => hideOverlay());
ipcMain.on('overlay:interactive', (_event, value) => setClickThrough(!value));
ipcMain.on('overlay:reset-position', () => resetPosition());
ipcMain.on('overlay:quit', () => {
  quitting = true;
  app.quit();
});
ipcMain.on('overlay:open-url', (_event, url) => {
  if (typeof url === 'string' && /^https?:\/\//.test(url)) shell.openExternal(url);
});

/* --------------------------------------------------------------------- setup */

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true },
  },
]);

app.commandLine.appendSwitch('enable-transparent-visuals');
app.commandLine.appendSwitch('disable-background-timer-throttling');
if (process.platform === 'linux') app.commandLine.appendSwitch('disable-gpu-compositing');

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => showOverlay({ interactive: true, focus: true }));

  app.whenReady().then(() => {
    settings = loadSettings();

    protocol.handle('app', (request) => {
      const url = new URL(request.url);
      const relative = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
      const target = path.normalize(path.join(DIST, relative));
      if (!target.startsWith(DIST)) {
        return new Response('forbidden', { status: 403 });
      }
      return net.fetch(pathToFileURL(target).toString());
    });

    // Hotkeys first: the renderer asks for them during bootstrap to warn about conflicts.
    registerHotkeys();
    createWindow();
    createTray();
    startGameWatcher();
    refreshTrayMenu();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
    if (gameTimer) clearInterval(gameTimer);
  });
}
