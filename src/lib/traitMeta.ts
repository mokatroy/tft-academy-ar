import {
  Axe,
  Crosshair,
  Crown,
  Eye,
  Flame,
  Flower2,
  Gem,
  Ghost,
  Heart,
  Leaf,
  Moon,
  Mountain,
  PawPrint,
  Repeat,
  Shield,
  ShieldHalf,
  Skull,
  Smile,
  Sparkles,
  Star,
  Sun,
  Swords,
  Target,
  Users,
  Wand2,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export interface TraitMeta {
  Icon: LucideIcon;
  color: string;
}

const fallback: TraitMeta = { Icon: Star, color: '#d5b56d' };

const map: Record<string, TraitMeta> = {
  إلدروود: { Icon: Leaf, color: '#59c088' },
  'الشوكة السوداء': { Icon: Skull, color: '#a78bfa' },
  ازدهار: { Icon: Flower2, color: '#f472b6' },
  'اجتماع السحرة': { Icon: Wand2, color: '#c084fc' },
  عفريت: { Icon: Sparkles, color: '#2dd4bf' },
  جحيم: { Icon: Flame, color: '#fb923c' },
  قمري: { Icon: Moon, color: '#93a5fd' },
  شمسي: { Icon: Sun, color: '#fbbf24' },
  بدائي: { Icon: PawPrint, color: '#34d399' },
  'وحش الريفت': { Icon: Ghost, color: '#a3e635' },
  مدافع: { Icon: Shield, color: '#38bdf8' },
  مشاجر: { Icon: Swords, color: '#f87171' },
  طليعي: { Icon: ShieldHalf, color: '#60a5fa' },
  طاغوت: { Icon: Axe, color: '#fb7185' },
  مخرب: { Icon: Crosshair, color: '#f43f5e' },
  'نسّاج السحر': { Icon: Wand2, color: '#818cf8' },
  صياد: { Icon: Target, color: '#4ade80' },
  'نيران سريعة': { Icon: Zap, color: '#facc15' },
  جلاد: { Icon: Skull, color: '#ef4444' },
  عراف: { Icon: Eye, color: '#22d3ee' },
  مستدعي: { Icon: Users, color: '#a78bfa' },
  متكيف: { Icon: Repeat, color: '#2dd4bf' },
  مشاغب: { Icon: Smile, color: '#f9a8d4' },
  مونوليث: { Icon: Mountain, color: '#94a3b8' },
  غريم: { Icon: Swords, color: '#e879f9' },
  أفاتار: { Icon: Sparkles, color: '#f5c451' },
  'مطارد الجوائز': { Icon: Crown, color: '#f5c451' },
  المتآلفة: { Icon: Moon, color: '#a5b4fc' },
  'النمو القديم': { Icon: Leaf, color: '#4ade80' },
  'الأب الأخضر': { Icon: Leaf, color: '#22c55e' },
  'المفترس الأعلى': { Icon: Skull, color: '#f97316' },
  'سيدة الأشواك': { Icon: Flower2, color: '#e879f9' },
  'النبات الفتاك': { Icon: Flower2, color: '#84cc16' },
  'جوهر الزمرد': { Icon: Gem, color: '#34d399' },
  كاوي: { Icon: Heart, color: '#fb7185' },
};

export function getTraitMeta(name: string): TraitMeta {
  return map[name] ?? fallback;
}
