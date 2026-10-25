import { chromium } from '/tmp/node_modules/playwright-core/index.mjs';

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await (await browser.newContext()).newPage();
await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });

const diag = await page.evaluate(() => {
  const a = document.querySelector('a.footer-dl');
  const cs = getComputedStyle(a);
  const r = a.getBoundingClientRect();
  const probe = document.createElement('span');
  probe.textContent = 'hello مرحبا 123';
  probe.style.cssText = 'font-size:12px;position:absolute;white-space:nowrap';
  document.body.appendChild(probe);
  const probeRect = probe.getBoundingClientRect();
  const nav = document.querySelector('.footer-links a');
  const navRect = nav.getBoundingClientRect();
  return {
    dlRect: `${r.width}x${r.height}`,
    fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontFamily: cs.fontFamily,
    childNodes: a.childNodes.length, childTypes: [...a.childNodes].map(n => `${n.nodeType}:${JSON.stringify(n.textContent?.slice(0,20))}`),
    probe: `${probeRect.width}x${probeRect.height}`,
    navRect: `${navRect.width}x${navRect.height}`,
    fonts: document.fonts.size,
    ready: document.fonts.status,
    htmlBgOK: getComputedStyle(document.body).fontFamily,
  };
});
console.log(JSON.stringify(diag, null, 2));
await browser.close();
