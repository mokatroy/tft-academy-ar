import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../src/components/Layout';
import { Home } from '../src/pages/Home';
import { CompDetail } from '../src/pages/CompDetail';
import { Champions } from '../src/pages/Champions';
import { Items } from '../src/pages/Items';
import { Traits } from '../src/pages/Traits';
import { I18nProvider } from '../src/lib/i18n';
import type { Locale } from '../src/lib/types';

function render(path: string, locale: Locale) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <I18nProvider locale={locale}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="comp/:slug" element={<CompDetail />} />
            <Route path="champions" element={<Champions />} />
            <Route path="items" element={<Items />} />
            <Route path="traits" element={<Traits />} />
          </Route>
        </Routes>
      </I18nProvider>
    </MemoryRouter>,
  );
}

// Each check: [path, locale, must-contain strings…]
const checks: [string, Locale, string[]][] = [
  // Arabic (default)
  ['/', 'ar', ['إلدروود زايا', 'قائمة المستويات', 'جدار المدافعين', 'خط الصيادين']],
  ['/comp/elderwood-xayah', 'ar', ['خطة اللعب', 'hex-unit', 'إلدروود زايا']],
  ['/champions', 'ar', ['زايا', 'champ-grid']],
  ['/items', 'ar', ['item-grid']],
  ['/traits', 'ar', ['إلدروود', 'trait-grid']],
  ['/comp/defender-wall', 'ar', ['جدار المدافعين']],
  // English
  ['/', 'en', ['Elderwood Xayah', 'Tier list', 'Defender Wall', 'Hunter Line']],
  ['/comp/elderwood-xayah', 'en', ['Game plan', 'hex-unit', 'Elderwood Xayah']],
  ['/champions', 'en', ['champ-grid']],
  ['/items', 'en', ['item-grid']],
  ['/traits', 'en', ['trait-grid']],
  ['/comp/spellweaver-coven', 'en', ['Spellweave Circle']],
  // Japanese
  ['/', 'ja', ['エルダーウッド ザヤ', 'ティアリスト', 'ディフェンダーの壁']],
  ['/comp/elderwood-xayah', 'ja', ['攻略', 'hex-unit', 'エルダーウッド ザヤ']],
  ['/champions', 'ja', ['champ-grid']],
  ['/items', 'ja', ['item-grid']],
  ['/traits', 'ja', ['trait-grid']],
  ['/comp/invoker-backline', 'ja', ['インヴォーカーの後陣']],
];

let failed = 0;
for (const [path, locale, mustContain] of checks) {
  try {
    const html = render(path, locale);
    const units = (html.match(/class="hex-unit"/g) ?? []).length;
    const dirty = /undefined|NaN|\{\{|@[A-Za-z]/.test(html);
    const missing = mustContain.filter((needle) => !html.includes(needle));
    const ok = missing.length === 0 && !dirty;
    if (!ok) failed += 1;
    console.log(
      `${ok ? 'PASS' : 'FAIL'} [${locale}] ${path} — ${html.length} bytes` +
        (units ? `, ${units} board units` : '') +
        (missing.length ? `, missing: ${missing.join(' | ')}` : '') +
        (dirty ? ', contains raw placeholders' : ''),
    );
  } catch (error) {
    failed += 1;
    console.error(`FAIL [${locale}] ${path}`, error);
  }
}

if (failed > 0) {
  console.error(`${failed} route(s) failed`);
  process.exit(1);
}
console.log('smoke ok — all locales render');
