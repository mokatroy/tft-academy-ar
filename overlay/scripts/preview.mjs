#!/usr/bin/env node
/**
 * Browser preview harness for the overlay renderer.
 *
 *   npm run dev                # terminal 1 (port 3200)
 *   node scripts/preview.mjs  # terminal 2 -> artifacts/overlay-*.png
 *
 * Runs against the browser build (no Electron), so the mock game backdrop is
 * visible and every interaction below is a real click/key event.
 * Requires playwright-core + a chromium headless shell:
 *   npm i -D playwright-core && npx playwright install chromium-headless-shell
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(HERE, '..', '..', 'artifacts');
const OUT = resolve(OUT_DIR, 'overlay');
const BASE = process.env.OVERLAY_URL || 'http://127.0.0.1:3200/';

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-color-profile=srgb'],
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  locale: 'ar',
});
const page = await context.newPage();

const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('.ov-panel .ov-rail-item');
await page.waitForTimeout(400);

const report = {};
report.rail = await page.$$eval('.ov-rail-item', (nodes) =>
  nodes.map((node) => ({ comp: node.dataset.comp, text: node.textContent })),
);
report.units = await page.$$eval('.ov-unit', (nodes) => nodes.length);
report.hexes = await page.$$eval('.ov-hex', (nodes) => nodes.length);
report.traits = await page.$$eval('.ov-trait', (nodes) => nodes.map((node) => node.textContent));
report.picks = await page.$$eval('.ov-pick', (nodes) => nodes.length);
report.detailOverflow = await page.$eval('.ov-detail', (node) => node.scrollHeight - node.clientHeight);
await page.screenshot({ path: `${OUT}-ar.png` });

// Champion picker: mark the core units of the Elderwood comp.
await page.click('.ov-owned-add');
await page.waitForSelector('.ov-sheet-shop');
report.shopUnits = await page.$$eval('.ov-shop-unit', (nodes) => nodes.length);
await page.screenshot({ path: `${OUT}-shop.png` });
await page.locator('.ov-sheet-shop').screenshot({ path: `${OUT}-panel-shop.png` });

for (const id of ['DA_18_Xayah', 'DA_18_Ornn', 'DA_18_Alistar', 'DA_18_Hecarim']) {
  await page.click(`.ov-shop-unit[data-champion="${id}"]`);
}
report.chips = await page.$$eval('.ov-chip', (nodes) => nodes.length);
report.pickedCount = await page.$$eval('.ov-shop-unit.on', (nodes) => nodes.length);
await page.screenshot({ path: `${OUT}-shop-picked.png` });

await page.click('.ov-sheet-actions button:last-child');
await page.waitForSelector('.ov-sheet-shop', { state: 'detached' });
await page.waitForTimeout(250);

report.railAfter = await page.$$eval('.ov-rail-item', (nodes) =>
  nodes.map((node) => ({ comp: node.dataset.comp, text: node.textContent })),
);
report.fit = await page.$eval('.ov-fit', (node) => node.textContent);
report.topComp = await page.$eval('.ov-rail-item.on', (node) => node.dataset.comp);
report.boardUnits = await page.$$eval('.ov-unit', (nodes) => nodes.length);
await page.screenshot({ path: `${OUT}-ar-fit.png` });
await page.locator('.ov-panel').screenshot({ path: `${OUT}-panel-ar.png` });

// Local number shortcut switches comps.
await page.keyboard.press('2');
await page.waitForTimeout(150);
report.afterDigit2 = await page.$eval('.ov-rail-item.on', (node) => node.dataset.comp);
await page.keyboard.press('1');

// Settings + locale passes.
await page.click('.ov-top-actions button');
await page.waitForSelector('.ov-sheet-settings');
await page.screenshot({ path: `${OUT}-settings.png` });
await page.click('.ov-segmented button:has-text("English")');
await page.waitForTimeout(200);
report.dirEn = await page.evaluate(() => document.documentElement.dir);
report.railEn = await page.$$eval('.ov-rail-item', (nodes) => nodes.map((node) => node.textContent));
await page.click('.ov-sheet-actions button');
await page.waitForSelector('.ov-sheet-settings', { state: 'detached' });
await page.waitForTimeout(150);
await page.screenshot({ path: `${OUT}-en.png` });

await page.click('.ov-top-actions button');
await page.waitForSelector('.ov-sheet-settings');
await page.click('.ov-segmented button[dir], .ov-segmented button:nth-child(3)');
await page.waitForTimeout(200);
await page.click('.ov-sheet-actions button');
await page.waitForTimeout(200);
await page.screenshot({ path: `${OUT}-ja.png` });
report.dirJa = await page.evaluate(() => document.documentElement.dir);

await page.click('.ov-top-actions button');
await page.click('.ov-segmented button:has-text("العربية")');
await page.keyboard.press('Escape');
await page.waitForTimeout(150);
report.sheetClosedByEsc = (await page.$$('.ov-sheet-settings')).length === 0;

await page.setViewportSize({ width: 440, height: 700 });
await page.waitForTimeout(250);
await page.screenshot({ path: `${OUT}-narrow.png` });
report.narrowClipped = await page.$eval('.ov-panel', (node) => {
  const panel = node.getBoundingClientRect();
  return panel.height > window.innerHeight || panel.width > window.innerWidth;
});

report.errors = errors;
console.log(JSON.stringify(report, null, 2));
await browser.close();
