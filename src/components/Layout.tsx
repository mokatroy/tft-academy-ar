import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, Search, Swords, X } from 'lucide-react';
import { meta } from '../lib/data';
import { useI18n } from '../lib/i18n';
import { SearchDialog } from './SearchDialog';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [archiveUrl, setArchiveUrl] = useState<string | null>(null);
  const location = useLocation();
  const { t, localizePath } = useI18n();

  const navItems = [
    { to: '/', label: t({ ar: 'الكومبوهات', en: 'Comps', ja: '構成' }) },
    { to: '/play', label: t({ ar: 'وضع اللعب', en: 'Play mode', ja: 'プレイモード' }) },
    { to: '/builder', label: t({ ar: 'المنشئ', en: 'Builder', ja: 'ビルダー' }) },
    { to: '/champions', label: t({ ar: 'الأبطال', en: 'Champions', ja: 'チャンピオン' }) },
    { to: '/items', label: t({ ar: 'العناصر', en: 'Items', ja: 'アイテム' }) },
    { to: '/traits', label: t({ ar: 'الخواص', en: 'Traits', ja: '特性' }) },
    { to: '/patch', label: t({ ar: 'الباتش', en: 'Patch', ja: 'パッチ' }) },
  ];

  // Dev-only convenience: show a download link for the source archive when the
  // server actually serves it as a file (it is not part of production builds).
  useEffect(() => {
    let alive = true;
    const path = '/mokatroystft-source.zip';
    fetch(path, { method: 'HEAD' })
      .then((response) => {
        const type = response.headers.get('content-type') ?? '';
        if (alive && response.ok && type.includes('application/zip')) setArchiveUrl(path);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

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
          <Link to={localizePath('/')} className="brand" aria-label="TFT Academy">
            <span className="brand-mark">
              <Swords size={20} strokeWidth={2.4} />
            </span>
            <span>
              <span className="brand-title">MokaTroy</span>
              <span className="brand-sub">TFT · {t({ ar: 'عربي', en: 'EN', ja: '日本語' })}</span>
            </span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={localizePath(item.to)}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-tools">
            <LanguageSwitcher />
            <Link to={localizePath('/patch')} className="patch-badge">
              <i className="dot" />
              {t({ ar: 'باتش', en: 'Patch', ja: 'パッチ' })} {meta.patch}
            </Link>
            <button className="search-trigger" onClick={() => setSearchOpen(true)}>
              <Search size={15} />
              {t({ ar: 'ابحث في الموقع…', en: 'Search the site…', ja: 'サイト内検索…' })}
              <kbd>⌘K</kbd>
            </button>
            <button
              className="icon-btn only-mobile"
              onClick={() => setSearchOpen(true)}
              aria-label={t({ ar: 'بحث', en: 'Search', ja: '検索' })}
            >
              <Search size={17} />
            </button>
            <button
              className="icon-btn mobile-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={t({ ar: 'القائمة', en: 'Menu', ja: 'メニュー' })}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <nav className={`container mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={localizePath(item.to)}
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
                MokaTroy
              </div>
              <p className="footer-note">
                {t({
                  ar: 'موقع غير رسمي لمساعدة لاعبي Teamfight Tactics على متابعة الميتا: كومبوهات، تشكيلات، عناصر وخواص. تعتمد الأسماء والصور على بيانات CommunityDragon للمجموعة 18.',
                  en: 'An unofficial site helping Teamfight Tactics players follow the meta: comps, boards, items and traits. Names and images use CommunityDragon data for Set 18.',
                  ja: 'Teamfight Tacticsのメタ追跡を支援する非公式サイト：構成、盤面、アイテム、特性。名前と画像はセット18のCommunityDragonデータを使用。',
                })}
                <br />
                {t({
                  ar: 'الأدلة والترتيبات في هذا العرض تحريرية ولا تعتمد على إحصاءات رسمية.',
                  en: 'Guides and tiers here are editorial and not based on official stats.',
                  ja: 'ここでのガイドとティアは編集的であり、公式統計に基づくものではありません。',
                })}
              </p>
            </div>
            <div className="footer-links">
              {navItems.map((item) => (
                <Link key={item.to} to={localizePath(item.to)}>
                  {item.label}
                </Link>
              ))}
              {archiveUrl && (
                <a className="footer-dl" href={archiveUrl} download="mokatroystft-source.zip">
                  ⬇ {t({ ar: 'تحميل ملفات الموقع (ZIP)', en: 'Download site files (ZIP)', ja: 'サイトファイルをダウンロード (ZIP)' })}
                </a>
              )}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 MokaTroy</span>
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
