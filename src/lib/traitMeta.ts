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

// Keyed by stable trait apiName so icons/colors are locale-independent.
const map: Record<string, TraitMeta> = {
  DA_18_Elderwood: { Icon: Leaf, color: '#59c088' },
  DA_18_Blackthorn: { Icon: Skull, color: '#a78bfa' },
  DA_18_Blossom: { Icon: Flower2, color: '#f472b6' },
  DA_18_Coven: { Icon: Wand2, color: '#c084fc' },
  DA_18_Fae: { Icon: Sparkles, color: '#2dd4bf' },
  DA_18_Inferno: { Icon: Flame, color: '#fb923c' },
  DA_18_Lunar: { Icon: Moon, color: '#93a5fd' },
  DA_18_Solar: { Icon: Sun, color: '#fbbf24' },
  DA_Primal18: { Icon: PawPrint, color: '#34d399' },
  DA_Riftbeast18: { Icon: Ghost, color: '#a3e635' },
  DA_18_Defender: { Icon: Shield, color: '#38bdf8' },
  DA_18_Brawler: { Icon: Swords, color: '#f87171' },
  DA_18_Vanguard: { Icon: ShieldHalf, color: '#60a5fa' },
  DA_Juggernaut18: { Icon: Axe, color: '#fb7185' },
  DA_18_Slayer: { Icon: Crosshair, color: '#f43f5e' },
  DA_18_Spellweaver: { Icon: Wand2, color: '#818cf8' },
  DA_18_Hunter: { Icon: Target, color: '#4ade80' },
  DA_18_Rapidfire: { Icon: Zap, color: '#facc15' },
  DA_18_Executioner: { Icon: Skull, color: '#ef4444' },
  DA_18_Invoker: { Icon: Eye, color: '#22d3ee' },
  DA_18_Summoner: { Icon: Users, color: '#a78bfa' },
  DA_18_Adaptor: { Icon: Repeat, color: '#2dd4bf' },
  DA_18_Sprykin: { Icon: Smile, color: '#f9a8d4' },
  DA_18_Battlemage: { Icon: Mountain, color: '#94a3b8' },
  DA_18_Rival: { Icon: Swords, color: '#e879f9' },
  DA_18_LuxUniqueTrait: { Icon: Sparkles, color: '#f5c451' },
  DA_DravenUniqueTrait18: { Icon: Crown, color: '#f5c451' },
  DA_AluneUniqueTrait18: { Icon: Moon, color: '#a5b4fc' },
  DA_18_Maokai_UniqueTrait: { Icon: Leaf, color: '#4ade80' },
  DA_18_Greenfather: { Icon: Leaf, color: '#22c55e' },
  DA_18_ApexPredator: { Icon: Skull, color: '#f97316' },
  DA_18_ZyraUniqueTrait: { Icon: Flower2, color: '#e879f9' },
  DA_FloraFatalis18: { Icon: Flower2, color: '#84cc16' },
  DA_Emerald18: { Icon: Gem, color: '#34d399' },
  DA_18_Caustic: { Icon: Heart, color: '#fb7185' },
  DA_18_Eclipse: { Icon: Moon, color: '#6366f1' },
};

export function getTraitMeta(id: string): TraitMeta {
  return map[id] ?? fallback;
}
