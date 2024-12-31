import React from 'react';
import {
  Building2,
  Brain,
  Bot,
  Cpu,
  Database,
  Factory,
  FileCode2,
  Globe,
  HeartPulse,
  LineChart,
  MessageSquare,
  Network,
  Rocket,
  Search,
  Shield,
  Sparkles,
  type LucideIcon
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Brain,
  Bot,
  Cpu,
  Database,
  Factory,
  FileCode2,
  Globe,
  HeartPulse,
  LineChart,
  MessageSquare,
  Network,
  Rocket,
  Search,
  Shield,
  Sparkles
};

interface IconSelectorProps {
  selectedIcon: string;
  onSelect: (icon: string) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelect }) => {
  return (
    <div className="grid grid-cols-8 gap-2 p-2 border rounded-md">
      {Object.entries(ICONS).map(([iconName, Icon]) => (
        <button
          key={iconName}
          type="button"
          onClick={() => onSelect(iconName)}
          className={`p-2 rounded-md hover:bg-gray-100 ${
            selectedIcon === iconName ? 'bg-blue-100 ring-2 ring-blue-500' : ''
          }`}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

export default IconSelector;