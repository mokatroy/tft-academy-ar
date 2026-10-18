import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CompDetail } from './pages/CompDetail';
import { Champions } from './pages/Champions';
import { Items } from './pages/Items';
import { Traits } from './pages/Traits';

function NotFound() {
  return (
    <div className="empty-state" style={{ paddingBlock: 90 }}>
      <h1 style={{ fontSize: 40, fontWeight: 900, color: 'var(--gold-bright)' }}>404</h1>
      <p style={{ marginTop: 6 }}>الصفحة التي تبحث عنها غير موجودة.</p>
      <Link className="btn btn-ghost" to="/" style={{ marginTop: 14 }}>
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="comp/:slug" element={<CompDetail />} />
          <Route path="champions" element={<Champions />} />
          <Route path="items" element={<Items />} />
          <Route path="traits" element={<Traits />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
