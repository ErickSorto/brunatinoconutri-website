import {
  ArrowRight, CalendarDays, Check, Clock3, Globe2, Heart,
  Leaf, MessageCircle, Smartphone, UtensilsCrossed, Video, ShoppingBasket, ChevronLeft, ChevronRight, MailCheck,
} from "lucide-react";
import { siWhatsapp, siInstagram } from "simple-icons";

const icons = {
  mail: MailCheck,
  arrow: ArrowRight,
  check: Check,
  clock: Clock3,
  video: Video,
  leaf: Leaf,
  globe: Globe2,
  heart: Heart,
  message: MessageCircle,
  calendar: CalendarDays,
  phone: Smartphone,
  plate: UtensilsCrossed,
  basket: ShoppingBasket,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
} as const;

type IconName = keyof typeof icons | "whatsapp" | "instagram";

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const classes = `bk-icon ${className}`;
  if (name === "whatsapp" || name === "instagram") {
    return <svg className={classes} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={name === "whatsapp" ? siWhatsapp.path : siInstagram.path} /></svg>;
  }
  const LucideIcon = icons[name];
  return <LucideIcon className={classes} strokeWidth={1.65} aria-hidden="true" />;
}
