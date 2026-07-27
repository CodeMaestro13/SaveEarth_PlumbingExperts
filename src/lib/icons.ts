import {
  BadgeCheck,
  Bath,
  Building2,
  Clock3,
  Droplets,
  Factory,
  Hammer,
  Headphones,
  LifeBuoy,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Waves,
  Wrench,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const serviceIconOptions = [
  { key: "shield", label: "Shield", icon: ShieldCheck },
  { key: "building", label: "Building", icon: Building2 },
  { key: "droplets", label: "Droplets", icon: Droplets },
  { key: "bath", label: "Bathroom", icon: Bath },
  { key: "wrench", label: "Wrench", icon: Wrench },
  { key: "hammer", label: "Hammer", icon: Hammer },
  { key: "lifebuoy", label: "Leak Support", icon: LifeBuoy },
  { key: "waves", label: "Pool", icon: Waves },
  { key: "sparkles", label: "Maintenance", icon: Sparkles },
  { key: "factory", label: "Industrial", icon: Factory },
  { key: "clock", label: "AMC", icon: Clock3 }
];

const iconMap = serviceIconOptions.reduce<Record<string, LucideIcon>>((icons, item) => {
  icons[item.key] = item.icon;
  return icons;
}, {});

Object.assign(iconMap, {
  "badge-check": BadgeCheck,
  "shield-check": ShieldCheck,
  zap: Zap,
  headphones: Headphones,
  "map-pin": MapPin,
  "phone-call": PhoneCall,
  "clock-3": Clock3,
  clock3: Clock3,
  sparkles: Sparkles,
  droplets: Droplets
});

export function getServiceIcon(iconKey?: string, fallback?: LucideIcon) {
  if (iconKey && iconMap[iconKey]) {
    return iconMap[iconKey];
  }

  return fallback ?? Wrench;
}
