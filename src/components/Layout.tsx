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
          <Link to={localizePath('/')} className="brand" aria-label="MokaTroy">
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
                  ar: 'MokaTroy مشروع جماهيري غير رسمي ومجاني لمساعدة لاعبي Teamfight Tactics. ليس تابعًا لـ Riot Games ولا يعكس آراءها.',
                  en: 'MokaTroy is an unofficial, free fan project to help Teamfight Tactics players. It is not affiliated with Riot Games and does not reflect their views.',
                  ja: 'MokaTroyはTeamfight Tacticsプレイヤー向けの非公式・無料のファンプロジェクトです。Riot Gamesとは無関係で、同社の見解を反映しません。',
                })}
                <br />
                {t({
                  ar: 'Teamfight Tactics وLeague of Legends وجميع الأسماء والصور والعلامات التجارية المرتبطة بها ملك لـ Riot Games, Inc. نستخدم بيانات وأصولًا من CommunityDragon لأغراض العرض فقط.',
                  en: 'Teamfight Tactics, League of Legends, and all related names, images, and trademarks are property of Riot Games, Inc. We use CommunityDragon data and assets for display purposes only.',
                  ja: 'Teamfight Tactics、League of Legends、および関連する名称・画像・商標はRiot Games, Inc.の所有物です。表示目的のみでCommunityDragonのデータとアセットを使用しています。',
                })}
                <br />
                {t({
                  ar: 'الأدلة والتشكيلات والتير ليست تحريرية من MokaTroy وليست إحصاءات رسمية من Riot.',
                  en: 'Guides, comps, and tier lists are editorial content from MokaTroy and are not official Riot statistics.',
                  ja: 'ガイド・構成・ティアリストはMokaTroyの編集コンテンツであり、Riotの公式統計ではありません。',
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
            <span dir="ltr" style={{ maxWidth: 720, textAlign: 'end', lineHeight: 1.5 }}>
              MokaTroy was created under Riot Games&apos; &quot;Legal Jibber Jabber&quot; policy using
              assets owned by Riot Games. Riot Games does not endorse or sponsor this project.
              MokaTroy isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or
              opinions of Riot Games or anyone officially involved in producing or managing Riot
              Games properties. Riot Games and all associated properties are trademarks or
              registered trademarks of Riot Games, Inc.
            </span>
          </div>
        </div>
      </footer>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
