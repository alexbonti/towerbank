import React from 'react';
import { Camera } from 'lucide-react';
import type { Database } from '../../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileHeaderProps {
  profile: Partial<Profile>;
  onAvatarChange: (file: File) => void;
}

export default function ProfileHeader({ profile, onAvatarChange }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg" />
      
      {/* Avatar */}
      <div className="absolute -bottom-16 left-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 overflow-hidden">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Photo
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
            <Camera className="w-5 h-5 text-white" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && onAvatarChange(e.target.files[0])}
            />
          </label>
        </div>
      </div>
    </div>
  );
}