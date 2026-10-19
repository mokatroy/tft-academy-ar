import type { ReactNode } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HoverTipProvider } from './components/HoverTip';
import { Home } from './pages/Home';
import { CompDetail } from './pages/CompDetail';
import { Champions } from './pages/Champions';
import { Items } from './pages/Items';
import { Traits } from './pages/Traits';
import { Builder } from './pages/Builder';
import { Patch } from './pages/Patch';
import { I18nProvider, parseLocaleFromPath } from './lib/i18n';
import { useI18n } from './lib/i18n';

/** Derive the locale from the current URL and provide it to the tree. */
function LocalizedProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { locale } = parseLocaleFromPath(location.pathname);
  return (
    <I18nProvider locale={locale}>
      {children}
      <HoverTipProvider />
    </I18nProvider>
  );
}

function NotFound() {
  const { t, localizePath } = useI18n();
  return (
    <div className="empty-state" style={{ paddingBlock: 90 }}>
      <h1 style={{ fontSize: 40, fontWeight: 900, color: 'var(--gold-bright)' }}>404</h1>
      <p style={{ marginTop: 6 }}>
        {t({ ar: 'الصفحة التي تبحث عنها غير موجودة.', en: 'The page you are looking for does not exist.', ja: 'お探しのページは存在しません。' })}
      </p>
      <Link className="btn btn-ghost" to={localizePath('/')} style={{ marginTop: 14 }}>
        {t({ ar: 'العودة إلى الرئيسية', en: 'Back to home', ja: 'ホームに戻る' })}
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LocalizedProvider>
        <Routes>
          {/* Default (Arabic, no prefix) */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="comp/:slug" element={<CompDetail />} />
            <Route path="champions" element={<Champions />} />
            <Route path="items" element={<Items />} />
            <Route path="traits" element={<Traits />} />
            <Route path="builder" element={<Builder />} />
            <Route path="patch" element={<Patch />} />
          </Route>

          {/* English */}
          <Route path="en">
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="comp/:slug" element={<CompDetail />} />
              <Route path="champions" element={<Champions />} />
              <Route path="items" element={<Items />} />
              <Route path="traits" element={<Traits />} />
              <Route path="builder" element={<Builder />} />
              <Route path="patch" element={<Patch />} />
            </Route>
          </Route>

          {/* Japanese */}
          <Route path="ja">
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="comp/:slug" element={<CompDetail />} />
              <Route path="champions" element={<Champions />} />
              <Route path="items" element={<Items />} />
              <Route path="traits" element={<Traits />} />
              <Route path="builder" element={<Builder />} />
              <Route path="patch" element={<Patch />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocalizedProvider>
    </BrowserRouter>
  );
}
