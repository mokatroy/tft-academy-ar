import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../src/components/Layout';
import { Home } from '../src/pages/Home';
import { CompDetail } from '../src/pages/CompDetail';
import { Champions } from '../src/pages/Champions';
import { Items } from '../src/pages/Items';
import { Traits } from '../src/pages/Traits';
import { Builder } from '../src/pages/Builder';
import { Patch } from '../src/pages/Patch';
import { Play } from '../src/pages/Play';
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
            <Route path="builder" element={<Builder />} />
            <Route path="patch" element={<Patch />} />
            <Route path="play" element={<Play />} />
          </Route>
        </Routes>
      </I18nProvider>
    </MemoryRouter>,
  );
}

// Each check: [path, locale, must-contain strings…]
const checks: [string, Locale, string[]][] = [
  // Arabic (default)
  ['/', 'ar', ['إلدروود زايا', 'قائمة المستويات', 'جدار المدافعين', 'خط الصيادين', 'إلدروود فيغار', 'غريم كازيكس']],
  ['/comp/elderwood-xayah', 'ar', ['خطة اللعب', 'hex-unit', 'إلدروود زايا']],
  ['/champions', 'ar', ['زايا', 'champ-grid']],
  ['/items', 'ar', ['item-grid']],
  ['/traits', 'ar', ['إلدروود', 'trait-grid']],
  ['/builder', 'ar', ['منشئ الكومبوهات', 'builder-layout', 'pool-chip', 'الأبطال']],
  ['/comp/defender-wall', 'ar', ['جدار المدافعين']],
  ['/patch', 'ar', ['معلومات الباتش', '18.4', 'نيرف', 'patch-tabs', 'patch-tallies', 'dir-badge']],
  // Play mode — picker (no comp selected)
  ['/play', 'ar', ['وضع اللعب', 'play-pick-list', 'ابحث عن كومبو']],
  // English
  ['/', 'en', ['Elderwood Xayah', 'Tier list', 'Defender Wall', 'Hunter Line', 'Apex Predator', 'Rival Kha’Zix']],
  ['/comp/elderwood-xayah', 'en', ['Game plan', 'hex-unit', 'Elderwood Xayah']],
  ['/champions', 'en', ['champ-grid']],
  ['/items', 'en', ['item-grid']],
  ['/traits', 'en', ['trait-grid']],
  ['/builder', 'en', ['Comp builder', 'builder-layout', 'pool-chip']],
  ['/comp/spellweaver-coven', 'en', ['Spellweave Circle']],
  ['/patch', 'en', ['Patch Notes', '18.4', 'Nerf', 'patch-tabs', 'dir-badge']],
  ['/play', 'en', ['Play mode', 'play-pick-list', 'Search comps']],
  // Japanese
  ['/', 'ja', ['エルダーウッド ザヤ', 'ティアリスト', 'ディフェンダーの壁', '腐敗のアダプター', 'エクリプス ラピッドファイア']],
  ['/comp/elderwood-xayah', 'ja', ['攻略', 'hex-unit', 'エルダーウッド ザヤ']],
  ['/champions', 'ja', ['champ-grid']],
  ['/items', 'ja', ['item-grid']],
  ['/traits', 'ja', ['trait-grid']],
  ['/builder', 'ja', ['構成ビルダー', 'builder-layout', 'pool-chip']],
  ['/comp/invoker-backline', 'ja', ['インヴォーカーの後陣']],
  ['/patch', 'ja', ['パッチノート', '18.4', 'ネルフ', 'patch-tabs', 'dir-badge']],
  ['/play', 'ja', ['プレイモード', 'play-pick-list']],
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

// Every new set-18 meta comp must render on its detail page in every locale
// with a full board (8+ units) and no missing/unserialized strings.
const newCompSlugs = [
  'elderwood-veigar',
  'spellweaver-karma',
  'lunar-invokers',
  'rival-khazix',
  'caustic-adaptors',
  'apex-predator',
  'blossom-executioners',
  'blackthorn-sprykin',
  'flora-executioners',
  'rival-rengar',
  'eclipse-rapidfire',
  'elderwood-executioners',
];

for (const slug of newCompSlugs) {
  for (const locale of ['ar', 'en', 'ja'] as Locale[]) {
    try {
      const html = render(`/comp/${slug}`, locale);
      const units = (html.match(/class="hex-unit"/g) ?? []).length;
      const dirty = /undefined|NaN|\{\{|@[A-Za-z]/.test(html);
      const ok = units >= 8 && !dirty;
      if (!ok) failed += 1;
      console.log(
        `${ok ? 'PASS' : 'FAIL'} [${locale}] /comp/${slug} — ${html.length} bytes, ${units} board units` +
          (dirty ? ', contains raw placeholders' : units < 8 ? ', missing units' : ''),
      );
    } catch (error) {
      failed += 1;
      console.error(`FAIL [${locale}] /comp/${slug}`, error);
    }
  }
}

// Comps imported from TFT Academy (S–X tiers) must render their extra panels too:
// early board, carousel priorities, augment categories and the source link.
const academySlugs: [string, string, string][] = [
  ['set-18-tempo-riftbeast', 'البداية المبكرة', 'Early game board'],
  ['set-18-moo-nara', 'أولويات الكاروسيل', 'Carousel priorities'],
  ['set-18-coven-elise', 'أنواع التعزيزات', 'Augment categories'],
  ['set-18-unrivaled-reroll', 'TFT Academy', 'TFT Academy'],
];

for (const [slug, arNeedle, enNeedle] of academySlugs) {
  for (const locale of ['ar', 'en', 'ja'] as Locale[]) {
    try {
      const html = render(`/comp/${slug}`, locale);
      const units = (html.match(/class="hex-unit"/g) ?? []).length;
      const dirty = /undefined|NaN|\{\{|@[A-Za-z]/.test(html);
      const needle = locale === 'ar' ? arNeedle : locale === 'en' ? enNeedle : arNeedle;
      const missingPanel = locale === 'ja' ? false : !html.includes(needle);
      const ok = units >= 7 && !dirty && !missingPanel;
      if (!ok) failed += 1;
      console.log(
        `${ok ? 'PASS' : 'FAIL'} [${locale}] academy /comp/${slug} — ${html.length} bytes, ${units} board units` +
          (dirty ? ', contains raw placeholders' : '') +
          (missingPanel ? `, missing panel: ${needle}` : '') +
          (units < 7 ? ', missing units' : ''),
      );
    } catch (error) {
      failed += 1;
      console.error(`FAIL [${locale}] academy /comp/${slug}`, error);
    }
  }
}

// The X tier (avoid) must show up on the tier list alongside S/A/B/C.
// Play mode with a comp selected: sticky cockpit, stage stepper and full board.
const playView: [string, Locale, string[]][] = [
  [
    '/play?comp=set-18-tempo-riftbeast&stage=1',
    'ar',
    ['play-top', 'stage-tabs', 'المرحلة الحالية', 'التعزيزات المناسبة للكومبو ده', 'hex-unit', 'خطة الترقيم كاملة'],
  ],
  [
    '/play?comp=set-18-tempo-riftbeast&stage=1',
    'en',
    ['play-top', 'stage-tabs', 'Current stage', 'Augments for this comp', 'hex-unit', 'Full leveling plan'],
  ],
  [
    '/play?comp=elderwood-xayah',
    'ja',
    ['play-top', 'stage-tabs', '目標の盤面', 'クイックTips', 'hex-unit'],
  ],
];

for (const [path, locale, needles] of playView) {
  try {
    const html = render(path, locale);
    const units = (html.match(/class="hex-unit"/g) ?? []).length;
    const dirty = /undefined|NaN|\{\{|@[A-Za-z]/.test(html);
    const missing = needles.filter((needle) => !html.includes(needle));
    const ok = missing.length === 0 && !dirty && units >= 7;
    if (!ok) failed += 1;
    console.log(
      `${ok ? 'PASS' : 'FAIL'} [${locale}] ${path} — ${html.length} bytes, ${units} board units` +
        (missing.length ? `, missing: ${missing.join(' | ')}` : '') +
        (dirty ? ', contains raw placeholders' : ''),
    );
  } catch (error) {
    failed += 1;
    console.error(`FAIL [${locale}] ${path}`, error);
  }
}

const xLabels: Record<string, string> = { ar: 'تجنّب', en: 'Avoid', ja: '非推奨' };
for (const locale of ['ar', 'en', 'ja'] as Locale[]) {
  const html = render('/', locale);
  const ok = html.includes(xLabels[locale]) && !/undefined|NaN/.test(html);
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} [${locale}] / — X tier tab present (${xLabels[locale]})`);
}

if (failed > 0) {
  console.error(`${failed} route(s) failed`);
  process.exit(1);
}
console.log('smoke ok — all locales render');
