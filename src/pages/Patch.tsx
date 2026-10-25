import { useEffect, useMemo, useState } from 'react';
import { ArrowLeftRight, ArrowUpRight, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import {
  augmentMap,
  championMap,
  itemMap,
  meta,
  patchNotes,
  traitMap,
} from '../lib/data';
import type {
  ChangeDirection,
  Localized,
  PatchEntry,
  PatchGroup,
  PatchRefKind,
} from '../lib/types';
import {
  entryDirection,
  fetchedLabel,
  formatDate,
  lineDirection,
  patchEntryCount,
  patchTallies,
} from '../lib/patchNotes';
import { useI18n } from '../lib/i18n';
import { Portrait, TraitIcon } from '../components/Portrait';

type Filter = 'all' | ChangeDirection;

/** A section after the current direction filter has been applied. */
type VisibleSection = {
  id: string;
  title: Localized;
  commentary: Localized | null;
  groups: PatchGroup[];
};

const DIR_META: Record<ChangeDirection, { label: Localized; Icon: typeof TrendingUp }> = {
  buff: { label: { ar: 'باف', en: 'Buff', ja: 'バフ' }, Icon: TrendingUp },
  nerf: { label: { ar: 'نيرف', en: 'Nerf', ja: 'ネルフ' }, Icon: TrendingDown },
  adjust: { label: { ar: 'تعديل', en: 'Adjust', ja: '調整' }, Icon: ArrowLeftRight },
  change: { label: { ar: 'معلومة', en: 'Info', ja: '情報' }, Icon: Minus },
};

const NAME_MAPS: Record<PatchRefKind, Map<string, { name: Localized }>> = {
  champion: championMap,
  trait: traitMap,
  item: itemMap,
  augment: augmentMap,
};

function stripColon(text: string): string {
  return text.replace(/[:：]\s*$/, '').trim();
}

/** Prefer the linked game object's name (matches the rest of the site); fall back to the article. */
function entryName(entry: PatchEntry, t: (value: Localized, fallback?: string) => string): string {
  if (entry.ref) {
    const object = NAME_MAPS[entry.ref.k].get(entry.ref.id);
    if (object) return t(object.name);
  }
  return stripColon(t(entry.name, entry.name.en));
}

function EntryIcon({
  entry,
  t,
}: {
  entry: PatchEntry;
  t: (value: Localized, fallback?: string) => string;
}) {
  const ref = entry.ref;
  if (!ref) {
    return <span className="entry-fallback">{entryName(entry, t).slice(0, 1)}</span>;
  }
  if (ref.k === 'champion') {
    return <Portrait championId={ref.id} />;
  }
  if (ref.k === 'trait') {
    const trait = traitMap.get(ref.id);
    return trait ? <TraitIcon id={ref.id} name={t(trait.name)} size={34} /> : null;
  }
  const object = ref.k === 'item' ? itemMap.get(ref.id) : augmentMap.get(ref.id);
  if (object?.icon) {
    return (
      <span className="entry-icon" data-tip-kind={ref.k} data-tip-id={ref.id}>
        <img src={object.icon} alt="" loading="lazy" />
      </span>
    );
  }
  return <span className="entry-fallback">{entryName(entry, t).slice(0, 1)}</span>;
}

function DirBadge({ direction, t }: { direction: ChangeDirection; t: (value: Localized) => string }) {
  const { label, Icon } = DIR_META[direction];
  return (
    <span className={`dir-badge dir-${direction}`}>
      <Icon size={12} strokeWidth={2.6} />
      {t(label)}
    </span>
  );
}

export function Patch() {
  const { t, locale } = useI18n();
  const patches = patchNotes.patches;
  const [activeSlug, setActiveSlug] = useState(patches[0]?.slug ?? '');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    document.title = `${t({ ar: 'معلومات الباتش', en: 'Patch Notes', ja: 'パッチノート' })} | MokaTroy`;
  }, [t]);

  const patch = patches.find((candidate) => candidate.slug === activeSlug) ?? patches[0];
  const tallies = useMemo(() => (patch ? patchTallies(patch) : null), [patch]);

  if (!patch || !tallies) {
    return (
      <div className="empty-state" style={{ paddingBlock: 80 }}>
        {t({ ar: 'لا توجد معلومات باتش بعد.', en: 'No patch data yet.', ja: 'パッチ情報はまだありません。' })}
      </div>
    );
  }

  const totals = tallies.buff + tallies.nerf + tallies.adjust + tallies.change;
  // Riot only translates the CMS description on some articles; when it is
  // still English and there is an intro (which is translated), skip the
  // duplicate English line and let the intro carry the summary.
  const descText =
    locale === 'en' || patch.desc[locale] !== patch.desc.en || !patch.intro
      ? t(patch.desc, patch.desc.en)
      : '';
  const matchesFilter = (direction: ChangeDirection): boolean =>
    filter === 'all' || direction === filter;

  const sections: VisibleSection[] = patch.sections
    .map((section): VisibleSection | null => {
      const groups = section.groups
        .map((group): PatchGroup | null => {
          const entries = group.entries.filter((entry) => matchesFilter(entryDirection(entry)));
          const notes =
            filter === 'all'
              ? group.notes
              : group.notes.filter((note) => lineDirection(note.en) === filter);
          const visibleCommentary = filter === 'all' ? group.commentary : null;
          if (entries.length === 0 && notes.length === 0 && !visibleCommentary) return null;
          return { ...group, entries, notes, commentary: visibleCommentary };
        })
        .filter((group): group is PatchGroup => group !== null);
      const commentary = filter === 'all' ? section.commentary : null;
      if (groups.length === 0 && !commentary) return null;
      return { ...section, groups, commentary };
    })
    .filter(
      (section): section is VisibleSection =>
        section !== null && (section.groups.length > 0 || section.commentary !== null),
    );

  const filters: { key: Filter; label: Localized }[] = [
    { key: 'all', label: { ar: 'الكل', en: 'All', ja: 'すべて' } },
    { key: 'buff', label: DIR_META.buff.label },
    { key: 'nerf', label: DIR_META.nerf.label },
    { key: 'adjust', label: DIR_META.adjust.label },
  ];

  return (
    <div className="fade-in">
      <div className="section-head">
        <div>
          <h1 className="section-title">
            {t({ ar: 'معلومات الباتش', en: 'Patch Notes', ja: 'パッチノート' })}
          </h1>
          <p className="section-sub">
            {t(meta.setName)} ·{' '}
            {t({
              ar: `نوتز البوت الرسمية لـ ${meta.set === 18 ? 'المجموعة 18' : `المجموعة ${meta.set}`}: كل باف ونيرف مع تاريخ كل باتش. البيانات مأخوذة من موقع Riot الرسمي.`,
              en: `Official balance changes for every Set ${meta.set} patch: every buff and nerf, straight from Riot's patch notes.`,
              ja: `セット${meta.set}の全パッチの公式バランス変更：バフとネルフをRiotのパッチノートから収録。`,
            })}{' '}
            <span className="muted">
              {t({ ar: 'تاريخ الجلب:', en: 'Fetched:', ja: '取得日:' })}{' '}
              {fetchedLabel(patchNotes, locale)}
            </span>
          </p>
        </div>
      </div>

      {/* Patch switcher */}
      <div className="patch-tabs" role="tablist" aria-label="Patches">
        {patches.map((candidate, index) => (
          <button
            key={candidate.slug}
            role="tab"
            aria-selected={candidate.slug === patch.slug}
            className={`patch-tab ${candidate.slug === patch.slug ? 'active' : ''}`}
            onClick={() => setActiveSlug(candidate.slug)}
          >
            {candidate.label}
            {index === 0 && (
              <i className="dot" title={t({ ar: 'الأحدث', en: 'Latest', ja: '最新' })} />
            )}
          </button>
        ))}
      </div>

      {/* Hero */}
      <div className="patch-hero">
        <div className="patch-hero-top">
          <span className="patch-hero-label">{patch.label}</span>
          <div className="patch-hero-info">
            <div className="patch-hero-meta">
              <span>{formatDate(patch.date, locale)}</span>
              <span>
                {totals} {t({ ar: 'تغيير', en: 'changes', ja: '変更' })}
              </span>
              {patch.designers.length > 0 && <span>{patch.designers.join(' · ')}</span>}
            </div>
            {descText && (
              <p className="patch-hero-desc" dir="auto">
                {descText}
              </p>
            )}
          </div>
          <a
            className="btn btn-ghost"
            href={patch.urls[locale]}
            target="_blank"
            rel="noreferrer"
          >
            {t({ ar: 'المصدر الرسمي', en: 'Official notes', ja: '公式ノート' })}
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="patch-tallies">
          {(['buff', 'nerf', 'adjust', 'change'] as const).map((direction) => (
            <span key={direction} className={`tally tally-${direction}`}>
              {(() => {
                const { Icon } = DIR_META[direction];
                return <Icon size={13} strokeWidth={2.6} />;
              })()}
              <b>{tallies[direction]}</b>
              {t(DIR_META[direction].label)}
            </span>
          ))}
        </div>

        {patch.intro && (
          <blockquote className="patch-intro" dir="auto">
            {t(patch.intro, patch.intro.en)}
          </blockquote>
        )}
      </div>

      {/* Direction filter */}
      <div className="filter-bar">
        {filters.map((entry) => (
          <button
            key={entry.key}
            className={`filter-chip ${filter === entry.key ? 'active' : ''}`}
            onClick={() => setFilter(entry.key)}
          >
            {t(entry.label)}
          </button>
        ))}
        <span className="result-count" style={{ marginInlineStart: 'auto', marginBottom: 0 }}>
          {patchEntryCount(patch)} {t({ ar: 'تغيير', en: 'changes', ja: '変更' })}
        </span>
      </div>

      {sections.length === 0 && (
        <div className="empty-state">
          {t({ ar: 'لا توجد تغييرات مطابقة في هذا البوت.', en: 'No matching changes in this patch.', ja: 'このパッチに一致する変更はありません。' })}
        </div>
      )}

      {sections.map((section) => (
        <section className="patch-section" key={section.id}>
          <h2 className="patch-sec-title">{t(section.title)}</h2>
          {section.commentary && (
            <p className="patch-commentary" dir="auto">
              {t(section.commentary, section.commentary.en)}
            </p>
          )}

          {section.groups.map((group, groupIndex) => (
            <div className="patch-group" key={`${section.id}-${groupIndex}`}>
              {t(group.title).trim() !== '' && (
                <h3 className="patch-group-title">{t(group.title)}</h3>
              )}
              {group.commentary && (
                <p className="patch-commentary" dir="auto">
                  {t(group.commentary, group.commentary.en)}
                </p>
              )}

              {group.entries.length > 0 && (
                <div className="patch-entries">
                  {group.entries.map((entry, entryIndex) => {
                    const direction = entryDirection(entry);
                    return (
                      <article className="patch-entry" key={`${entry.name.en}-${entryIndex}`}>
                        <div className="entry-head">
                          <EntryIcon entry={entry} t={t} />
                          <span className="entry-name" title={entryName(entry, t)}>
                            {entryName(entry, t)}
                          </span>
                          <DirBadge direction={direction} t={t} />
                        </div>
                        <ul className="entry-lines">
                          {entry.lines.map((line, lineIndex) => (
                            <li key={lineIndex} dir="auto">
                              {t(line, line.en)}
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              )}

              {group.notes.length > 0 && (
                <ul className="patch-notes">
                  {group.notes.map((note, noteIndex) => {
                    const direction = lineDirection(note.en);
                    return (
                      <li key={noteIndex} dir="auto" className={direction ? `note-${direction}` : ''}>
                        {t(note, note.en)}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}

      <p className="patch-source muted">
        {t({
          ar: 'المصدر: نوتز البوت الرسمية من Teamfight Tactics — التغييرات المعروضة مطابقة للأرقام الرسمية، والأسماء مرتبطة ببيانات الموقع.',
          en: 'Source: official Teamfight Tactics patch notes — numbers are shown exactly as published, names are linked to site data.',
          ja: '出典：Teamfight Tactics公式パッチノート。数値はそのまま掲載し、名前はサイトのデータと連動。',
        })}
      </p>
    </div>
  );
}
