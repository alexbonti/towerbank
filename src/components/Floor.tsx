import React from 'react';
import * as Icons from 'lucide-react';
import type { Database } from '../types/supabase';

type FloorProps = Database['public']['Tables']['floors']['Row'];

const Floor: React.FC<FloorProps> = ({ floor_number, name, icon, color, description }) => {
  // Dynamically get the icon component
  const Icon = (Icons as Record<string, Icons.LucideIcon>)[icon] || Icons.Building2;

  return (
    <div className={`${color} p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-inner">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Floor {floor_number}: {name}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Floor;