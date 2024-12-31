import { Building2, Users2, Wallet, PiggyBank, BarChart, Briefcase, HomeIcon } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface FloorData {
  level: number;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const floors: FloorData[] = [
  {
    level: 6,
    name: "Investment Banking",
    icon: BarChart,
    color: "bg-purple-100 hover:bg-purple-200",
    description: "Grow your wealth with expert investment strategies"
  },
  {
    level: 5,
    name: "Business Services",
    icon: Briefcase,
    color: "bg-blue-100 hover:bg-blue-200",
    description: "Complete business banking solutions"
  },
  {
    level: 4,
    name: "Wealth Management",
    icon: PiggyBank,
    color: "bg-green-100 hover:bg-green-200",
    description: "Personal wealth advisory and planning"
  },
  {
    level: 3,
    name: "Personal Banking",
    icon: Wallet,
    color: "bg-yellow-100 hover:bg-yellow-200",
    description: "Day-to-day banking made simple"
  },
  {
    level: 2,
    name: "Community Banking",
    icon: Users2,
    color: "bg-orange-100 hover:bg-orange-200",
    description: "Banking services for local communities"
  },
  {
    level: 1,
    name: "Welcome Lobby",
    icon: HomeIcon,
    color: "bg-red-100 hover:bg-red-200",
    description: "Start your journey with Tower Bank"
  }
];