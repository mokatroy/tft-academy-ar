import { useEffect } from 'react';
import { Info, Music4, Sparkles } from 'lucide-react';
import { set19Champions, set19Meta, set19Traits } from '../lib/set19';
import { useI18n } from '../lib/i18n';
import '../set19.css';

/** Set 19 Prismatic Tour preview (PBE data). Full UI loads once champion/trait JSON is present. */
export function Set19() {
  const { t } = useI18n();

  useEffect(() => {
    document.title = `${t(set19Meta.title)} — Set 19 | MokaTroy`;
  }, [t]);

  const bands = set19Traits.filter((trait) => trait.type === 'origin');

  return (
    <div className="fade-in">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">
              <Sparkles size={13} />
              {t({ ar: 'المجموعة 19 · سيرفر PBE', en: 'Set 19 · PBE server', ja: 'セット19 · PBEサーバー' })}
            </span>
            <h1 className="hero-title">
              {t({ ar: 'المجموعة 19:', en: 'Set 19:', ja: 'セット19：' })}{' '}
              <span className="gradient-text">{t(set19Meta.title)}</span>
            </h1>
            <p className="hero-sub">
              {t({
                ar: 'جولة عالمية على المسارح الكبرى. صفحة السيزون الجديد قبل النزول الرسمي — البيانات من سيرفر PBE وقد تتغيّر.',
                en: 'A global tour on bigger stages. Set 19 preview before live servers — PBE data may change.',
                ja: '世界ツアーの大きなステージへ。ライブ前のセット19プレビュー。PBEデータは変更される場合があります。',
              })}
            </p>
            <div className="hero-stats">
              <div>
                <div className="stat-value">{set19Champions.length || '—'}</div>
                <div className="stat-label">{t({ ar: 'بطل', en: 'champions', ja: 'チャンピオン' })}</div>
              </div>
              <div>
                <div className="stat-value">{set19Traits.length || '—'}</div>
                <div className="stat-label">{t({ ar: 'خاصية', en: 'traits', ja: '特性' })}</div>
              </div>
              <div>
                <div className="stat-value">{bands.length || '—'}</div>
                <div className="stat-label">{t({ ar: 'فرقة', en: 'bands', ja: 'バンド' })}</div>
              </div>
              <div>
                <div className="stat-value">{set19Meta.augmentSummary?.total ?? '—'}</div>
                <div className="stat-label">{t({ ar: 'أوغمنت', en: 'augments', ja: 'オーグメント' })}</div>
              </div>
            </div>
            <div className="set19-note" style={{ marginTop: 20 }}>
              <Info size={16} />
              <div>
                {t({
                  ar: 'جاري استكمال بيانات الأبطال والخواص والعناصر من PBE. حدّث الصفحة قريبًا بعد رفع ملفات البيانات الكاملة.',
                  en: 'Champion, trait and item data from PBE is being finalized. Refresh soon after the full data files are uploaded.',
                  ja: 'PBEのチャンピオン・特性・アイテムデータを整備中です。完全データ反映後に再読み込みしてください。',
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
