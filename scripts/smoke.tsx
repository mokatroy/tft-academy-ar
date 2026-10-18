import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../src/components/Layout';
import { Home } from '../src/pages/Home';
import { CompDetail } from '../src/pages/CompDetail';
import { Champions } from '../src/pages/Champions';
import { Items } from '../src/pages/Items';
import { Traits } from '../src/pages/Traits';

function render(path: string) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="comp/:slug" element={<CompDetail />} />
          <Route path="champions" element={<Champions />} />
          <Route path="items" element={<Items />} />
          <Route path="traits" element={<Traits />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

const checks: [string, (html: string) => boolean][] = [
  ['/', (html) => html.includes('إلدروود زايا') && html.includes('قائمة المستويات')],
  ['/comp/elderwood-xayah', (html) => html.includes('خطة اللعب') && html.includes('hex-unit')],
  ['/champions', (html) => html.includes('زايا') && html.includes('champ-grid')],
  ['/items', (html) => html.includes('السيف الأبدي') && html.includes('item-grid')],
  ['/traits', (html) => html.includes('إلدروود') && html.includes('trait-grid')],
  ['/comp/riftbeast-swarm', (html) => html.includes('وحش الريفت')],
];

let failed = 0;
for (const [path, check] of checks) {
  try {
    const html = render(path);
    const units = (html.match(/class="hex-unit"/g) ?? []).length;
    const dirty = /undefined|NaN|\{\{|@[A-Za-z]/.test(html);
    const ok = check(html) && !dirty;
    if (!ok) failed += 1;
    console.log(
      `${ok ? 'PASS' : 'FAIL'} ${path} — ${html.length} bytes${units ? `, ${units} board units` : ''}${dirty ? ', contains raw placeholders' : ''}`,
    );
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${path}`, error);
  }
}

if (failed > 0) {
  console.error(`${failed} route(s) failed`);
  process.exit(1);
}
console.log('smoke ok');
