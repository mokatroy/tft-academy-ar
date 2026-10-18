import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, Search, Swords, X } from 'lucide-react';
import { meta } from '../lib/data';
import { SearchDialog } from './SearchDialog';

const navItems = [
  { to: '/', label: 'الكومبوهات' },
  { to: '/champions', label: 'الأبطال' },
  { to: '/items', label: 'العناصر' },
  { to: '/traits', label: 'الخواص' },
];

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;
      if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="أكاديمية TFT">
            <span className="brand-mark">
              <Swords size={20} strokeWidth={2.4} />
            </span>
            <span>
              <span className="brand-title">أكاديمية TFT</span>
              <span className="brand-sub">TFT Academy · عربي</span>
            </span>
          </Link>

          <nav className="main-nav" aria-label="التنقل الرئيسي">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-tools">
            <span className="patch-badge">
              <i className="dot" />
              باتش {meta.patch}
            </span>
            <button className="search-trigger" onClick={() => setSearchOpen(true)}>
              <Search size={15} />
              ابحث في الموقع…
              <kbd>⌘K</kbd>
            </button>
            <button
              className="icon-btn only-mobile"
              onClick={() => setSearchOpen(true)}
              aria-label="بحث"
            >
              <Search size={17} />
            </button>
            <button
              className="icon-btn mobile-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="القائمة"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <nav className={`container mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="التنقل للجوال">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="container page">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            <div>
              <div className="footer-brand">
                <span className="brand-mark" style={{ width: 30, height: 30, borderRadius: 9 }}>
                  <Swords size={16} />
                </span>
                أكاديمية TFT
              </div>
              <p className="footer-note">
                نسخة عربية غير رسمية لمساعدة لاعبي Teamfight Tactics على متابعة الميتا: كومبوهات، تشكيلات،
                عناصر وخواص. تعتمد الأسماء والصور على بيانات CommunityDragon للمجموعة 18.
                <br />
                الأدلة والترتيبات في هذا العرض تحريرية ولا تعتمد على إحصاءات رسمية.
              </p>
            </div>
            <div className="footer-links">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 أكاديمية TFT — نسخة عربية</span>
            <span dir="ltr">
              TFT Academy isn’t endorsed by Riot Games and doesn’t reflect the views of Riot Games.
            </span>
          </div>
        </div>
      </footer>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
