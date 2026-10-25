import { chromium } from '/workspace/homes/75e39a150935c6b5d1db93a9/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';

const base = 'http://127.0.0.1:3000';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext();
const page = await ctx.newPage();
await page.goto(base, { waitUntil: 'networkidle' });

const link = page.locator('a.footer-dl[download="mokatroystft-source.zip"]');
await link.waitFor({ state: 'attached', timeout: 15000 });

const box = await link.boundingBox();
const info = await link.evaluate((el) => {
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return { rect: `${r.width}x${r.height}`, display: cs.display, padding: cs.padding };
});
console.log('box:', JSON.stringify(box), 'computed:', JSON.stringify(info));

// Real click -> download event.
const [download] = await Promise.all([
  page.waitForEvent('download', { timeout: 15000 }),
  link.click(),
]);
const dest = '/tmp/footer-dl.zip';
await download.saveAs(dest);
const bytes = fs.statSync(dest).size;
console.log('downloaded:', download.suggestedFilename(), bytes, 'bytes');

await browser.close();

const { execSync } = await import('node:child_process');
const entries = execSync(`python3 -c "import zipfile; z=zipfile.ZipFile('${dest}'); print(len(z.namelist()), z.testzip())"`).toString().trim();
console.log('zip entries/errors:', entries);

const ok = box && box.width > 40 && box.height > 20 && bytes > 100000 && entries.endsWith('None');
console.log(ok ? 'FOOTER BUTTON OK — clickable and downloads valid zip' : 'FOOTER BUTTON FAIL');
process.exit(ok ? 0 : 1);
