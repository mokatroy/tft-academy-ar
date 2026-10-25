import fs from 'node:fs';

const HOME = '/workspace/homes/75e39a150935c6b5d1db93a9';
const rosterSize = JSON.parse(fs.readFileSync('src/data/champions.json', 'utf8')).length;
const { chromium } = await import(`${HOME}/tools/node_modules/playwright-core/index.mjs`);

const base = 'http://127.0.0.1:3000';
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
browser.on('disconnected', () => console.log('!! browser disconnected'));
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: base }).catch(() => undefined);
const page = await ctx.newPage();

const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`));

fs.mkdirSync('artifacts', { recursive: true });
const tip = page.locator('.hover-tip');

const showTip = async (selector) => {
  await page.locator(selector).first().hover();
  try {
    await tip.waitFor({ state: 'visible', timeout: 3500 });
    return true;
  } catch {
    return false;
  }
};

// ---------- 1. Home: comp roster + champion hover tooltip ----------
await page.goto(`${base}/`, { waitUntil: 'networkidle' });
const compCards = await page.locator('.comp-card').count();
check('home renders full comp roster', compCards >= 29, `${compCards} cards`);

const firstPortrait = page.locator('.showcase-units .unit-portrait').first();
const expectedChamp = (await firstPortrait.locator('img').getAttribute('alt')) ?? '';
const champTipShown = await showTip('.showcase-units .unit-portrait');
const champTipText = champTipShown ? ((await tip.textContent()) ?? '') : '';
check(
  'champion portrait hover → tooltip',
  champTipShown && champTipText.includes(expectedChamp),
  champTipText.replace(/\s+/g, ' ').slice(0, 70),
);
if (champTipShown) {
  const ability = await tip.locator('.tip-ability b').count();
  const stats = await tip.locator('.tip-stats span').count();
  const traitPills = await tip.locator('.tip-trait').count();
  check(
    'tooltip has ability, stats and trait pills',
    ability === 1 && stats >= 4 && traitPills >= 1,
    `${ability} ability, ${stats} stats, ${traitPills} traits`,
  );
}
await page.screenshot({ path: 'artifacts/tooltip-home.png' });
await page.mouse.move(8, 8);
await page.waitForTimeout(450);
check('tooltip hides after pointer leaves', !(await tip.isVisible().catch(() => false)));

// ---------- 2. Items page: item hover tooltip ----------
await page.goto(`${base}/items`, { waitUntil: 'networkidle' });
const itemName = ((await page.locator('.item-name').first().textContent()) ?? '').trim();
const itemTipShown = await showTip('.item-head');
const itemTipText = itemTipShown ? ((await tip.textContent()) ?? '') : '';
check(
  'item hover → tooltip with name + description',
  itemTipShown && itemTipText.includes(itemName) && (await tip.locator('.tip-desc').count()) === 1,
  itemName,
);

// ---------- 3. Traits page: trait hover tooltip ----------
await page.goto(`${base}/traits`, { waitUntil: 'networkidle' });
const traitName = ((await page.locator('.trait-name').first().textContent()) ?? '').trim();
const traitTipShown = await showTip('.trait-card-head');
const traitTipText = traitTipShown ? ((await tip.textContent()) ?? '') : '';
const hasSteps = traitTipShown && (await tip.locator('.tip-kicker').count()) === 1;
check('trait hover → tooltip with breakpoints', traitTipShown && traitTipText.includes(traitName) && hasSteps, traitName);

// ---------- 4. Comp detail: board, augment tooltip, builder bridge ----------
await page.goto(`${base}/comp/eclipse-rapidfire`, { waitUntil: 'networkidle' });
const boardUnits = await page.locator('.board .hex-unit').count();
check('comp detail board renders (≥8 units)', boardUnits >= 8, `${boardUnits} units`);

const augmentName =
  (await page
    .locator('.augment-name')
    .first()
    .evaluate((el) => (el.firstChild?.textContent ?? '').trim())) || '';
const augmentTipShown = await showTip('.augment-row');
const augmentTipText = augmentTipShown ? ((await tip.textContent()) ?? '') : '';
check(
  'augment hover → tooltip',
  augmentTipShown && augmentTipText.includes(augmentName),
  augmentName,
);

const bridgeCount = await page.locator('a[href*="/builder?load="]').count();
check('comp page links to builder (try-in-builder)', bridgeCount >= 1, `${bridgeCount} links`);

// ---------- 5. Builder: pool → board → stars → items → traits ----------
await page.goto(`${base}/builder`, { waitUntil: 'networkidle' });
const poolCount = await page.locator('.pool-chip').count();
check('builder pool lists all champions', poolCount === rosterSize, `${poolCount}/${rosterSize} chips`);

// clear any leftovers so counts are deterministic
if ((await page.locator('.builder-unit').count()) > 0) {
  await page.locator('.builder-actions .btn').nth(1).click();
}
const chips = page.locator('.pool-chip');
const chipNames = [];
for (let i = 0; i < 3; i += 1) {
  chipNames.push(((await chips.nth(i).locator('span').textContent()) ?? '').trim());
  await chips.nth(i).click();
}
const added = await page.locator('.builder-unit').count();
check('clicking pool champions adds units to board', added === 3, `${added} units: ${chipNames.join(', ')}`);

const traitRows = await page.locator('.builder-side .trait-row').count();
check('live trait panel updates', traitRows > 0, `${traitRows} trait rows`);

await page.locator('.builder-unit').first().click();
const selectedCount = await page.locator('.builder-unit.selected').count();
const selName = ((await page.locator('.sel-name').textContent()) ?? '').trim();
check('clicking a unit opens the selected-unit panel', selectedCount === 1 && selName.length > 0, selName);

await page.locator('.star-btn').nth(2).click();
const stars = ((await page.locator('.builder-unit.selected .hex-stars').textContent()) ?? '').trim();
check('star control sets 3★', stars === '★★★', stars);

await page.locator('.sel-item.empty').first().click();
const pickerVisible = await page.locator('.item-picker').isVisible().catch(() => false);
check('item picker opens', pickerVisible);
if (pickerVisible) {
  await page.locator('.item-pick').first().click();
  const filled = await page.locator('.sel-item.filled').count();
  const boardItemImgs = await page.locator('.builder-unit.selected .hex-items img').count();
  check('equipping an item shows on panel + board', filled === 1 && boardItemImgs === 1, `${filled} slot, ${boardItemImgs} board img`);
}

// share link (clipboard with fallback to visible input)
await page.locator('.builder-actions .btn').nth(0).click();
await page.waitForTimeout(1200);
let sharedUrl = null;
const fallback = page.locator('.share-url');
if (await fallback.isVisible().catch(() => false)) {
  sharedUrl = await fallback.inputValue();
} else {
  try {
    const txt = await page.evaluate(() => navigator.clipboard.readText());
    if (txt.includes('?b=')) sharedUrl = txt;
  } catch {
    /* clipboard denied */
  }
}
check('share produces a board link', !!sharedUrl, sharedUrl ?? 'no clipboard and no fallback');

// clear board
await page.locator('.builder-actions .btn').nth(1).click();
check('clear empties the board', (await page.locator('.builder-unit').count()) === 0);

// shared link round-trip restores the exact board
if (sharedUrl) {
  await page.goto(sharedUrl, { waitUntil: 'networkidle' });
  check('shared link restores the board', (await page.locator('.builder-unit').count()) === 3, `${await page.locator('.builder-unit').count()} units from link`);
}

// try-in-builder bridge from comp detail
await page.goto(`${base}/comp/elderwood-executioners`, { waitUntil: 'networkidle' });
await page.locator('a[href*="/builder?load="]').first().click();
await page.waitForURL('**/builder?load=*', { timeout: 8000 });
const loaded = await page.locator('.builder-unit').count();
check('comp → builder bridge loads full comp', loaded >= 8, `${loaded} units`);

// plain /builder reuses saved state (localStorage persistence)
await page.goto(`${base}/builder`, { waitUntil: 'networkidle' });
const persisted = await page.locator('.builder-unit').count();
check('board persists in localStorage', persisted >= 8, `${persisted} units after plain revisit`);

await page.locator('.builder-unit').first().click();
await page.screenshot({ path: 'artifacts/builder.png' });

// ---------- 6. Console health ----------
const realErrors = consoleErrors.filter((e) => !/favicon|DevTools/i.test(e));
check('no console/page errors', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));

await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
