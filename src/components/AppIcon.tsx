import BookOpen from "lucide-react-native/icons/book-open";
import Compass from "lucide-react-native/icons/compass";
import Heart from "lucide-react-native/icons/heart";
import House from "lucide-react-native/icons/house";
import LockKeyhole from "lucide-react-native/icons/lock-keyhole";
import Map from "lucide-react-native/icons/map";
import MessageCircle from "lucide-react-native/icons/message-circle";
import Search from "lucide-react-native/icons/search";
import Settings from "lucide-react-native/icons/settings";
import Target from "lucide-react-native/icons/target";
import Users from "lucide-react-native/icons/users";
import type { SkillNode } from "../types";

export type AppIconName = SkillNode["icon"] | "book" | "home" | "lock" | "map" | "search" | "settings";

const iconMap = {
  book: BookOpen,
  compass: Compass,
  heart: Heart,
  home: House,
  lock: LockKeyhole,
  map: Map,
  messages: MessageCircle,
  search: Search,
  settings: Settings,
  target: Target,
  users: Users
} satisfies Record<AppIconName, typeof Compass>;

export function AppIcon({
  name,
  size = 20,
  color = "#1e3a34",
  strokeWidth = 1.8
}: {
  name: AppIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const Icon = iconMap[name];
  return <Icon size={size} color={color} strokeWidth={strokeWidth} aria-hidden />;
}
