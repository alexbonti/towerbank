import React from 'react';
import { UserCircle } from 'lucide-react';
import type { Profile } from '../../types/profiles';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
      {profile.avatar_url ? (
        <img
          src={profile.avatar_url}
          alt={profile.role || 'Profile'}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <UserCircle className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <div>
        <div className="font-medium">{profile.role || 'Member'}</div>
        {profile.description && (
          <p className="text-sm text-gray-500">{profile.description}</p>
        )}
      </div>
    </div>
  );
}