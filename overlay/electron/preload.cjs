'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('tftOverlay', {
  bootstrap: () => ipcRenderer.invoke('overlay:bootstrap'),
  update: (patch) => ipcRenderer.send('overlay:update', patch),
  hide: () => ipcRenderer.send('overlay:hide'),
  setInteractive: (value) => ipcRenderer.send('overlay:interactive', Boolean(value)),
  resetPosition: () => ipcRenderer.send('overlay:reset-position'),
  quit: () => ipcRenderer.send('overlay:quit'),
  openUrl: (url) => ipcRenderer.send('overlay:open-url', url),
  checkUpdate: () => ipcRenderer.invoke('overlay:check-update'),
  onCommand: (handler) => {
    const listener = (_event, command) => handler(command);
    ipcRenderer.on('overlay:command', listener);
    return () => ipcRenderer.removeListener('overlay:command', listener);
  },
});
