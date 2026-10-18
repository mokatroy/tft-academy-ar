import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Swords } from 'lucide-react';
import { champions, comps, items, traits } from '../lib/data';
import { Portrait } from './Portrait';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const normalized = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalized) {
      return {
        comps: comps.slice(0, 4),
        champions: [] as typeof champions,
        items: [] as typeof items,
        traits: [] as typeof traits,
      };
    }
    return {
      comps: comps
        .filter((comp) => `${comp.name} ${comp.subtitle} ${comp.playstyle}`.toLowerCase().includes(normalized))
        .slice(0, 4),
      champions: champions.filter((champion) => champion.name.toLowerCase().includes(normalized)).slice(0, 6),
      items: items.filter((item) => item.name.toLowerCase().includes(normalized)).slice(0, 5),
      traits: traits.filter((trait) => trait.name.toLowerCase().includes(normalized)).slice(0, 5),
    };
  }, [normalized]);

  const hasResults =
    results.comps.length + results.champions.length + results.items.length + results.traits.length > 0;

  if (!open) return null;

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="search-overlay" onMouseDown={onClose} role="presentation">
      <div
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="بحث في الموقع"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="search-dialog-input">
          <Search size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث عن كومب، بطل، عنصر أو خاصية…"
          />
          <kbd>Esc</kbd>
        </div>

        <div className="search-results">
          {!hasResults && <div className="empty-state">لا توجد نتائج مطابقة لـ «{query}»</div>}

          {results.comps.length > 0 && (
            <>
              <div className="result-group-title">الكومبوهات</div>
              {results.comps.map((comp) => (
                <button className="result-item" key={comp.slug} onClick={() => go(`/comp/${comp.slug}`)}>
                  <span className="result-icon">
                    <Swords size={15} />
                  </span>
                  <span>
                    <span className="result-title">{comp.name}</span>
                    <span className="result-sub"> — {comp.subtitle}</span>
                  </span>
                </button>
              ))}
            </>
          )}

          {results.champions.length > 0 && (
            <>
              <div className="result-group-title">الأبطال</div>
              {results.champions.map((champion) => (
                <button
                  className="result-item"
                  key={champion.id}
                  onClick={() => go(`/champions?champ=${encodeURIComponent(champion.id)}`)}
                >
                  <Portrait championId={champion.id} />
                  <span>
                    <span className="result-title">{champion.name}</span>
                    <span className="result-sub"> — {champion.traits.join(' · ')}</span>
                  </span>
                </button>
              ))}
            </>
          )}

          {results.items.length > 0 && (
            <>
              <div className="result-group-title">العناصر</div>
              {results.items.map((item) => (
                <button className="result-item" key={item.id} onClick={() => go(`/items?q=${encodeURIComponent(item.name)}`)}>
                  {item.icon ? (
                    <img className="result-icon" src={item.icon} alt="" style={{ objectFit: 'cover' }} />
                  ) : (
                    <span className="result-icon">
                      <Sparkles size={15} />
                    </span>
                  )}
                  <span>
                    <span className="result-title">{item.name}</span>
                    <span className="result-sub"> — {item.kind === 'component' ? 'مكوّن' : 'عنصر مكتمل'}</span>
                  </span>
                </button>
              ))}
            </>
          )}

          {results.traits.length > 0 && (
            <>
              <div className="result-group-title">الخواص</div>
              {results.traits.map((trait) => (
                <button className="result-item" key={trait.id} onClick={() => go(`/traits?trait=${encodeURIComponent(trait.name)}`)}>
                  <span className="result-icon">
                    <Sparkles size={15} />
                  </span>
                  <span>
                    <span className="result-title">{trait.name}</span>
                    <span className="result-sub"> — خاصية</span>
                  </span>
                </button>
              ))}
            </>
          )}

          {!normalized && (
            <div className="empty-state" style={{ padding: '12px 10px', fontSize: 11 }}>
              جرّب البحث باسم بطل مثل «زايا» أو عنصر مثل «السيف الأبدي».
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
