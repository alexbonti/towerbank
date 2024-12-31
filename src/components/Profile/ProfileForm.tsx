import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ProfileForm() {
  const { profile, isLoading, updateProfile, handleAvatarChange } = useProfile();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <ProfileHeader 
        profile={profile} 
        onAvatarChange={handleAvatarChange} 
      />
      <div className="p-6 mt-16">
        <ProfileDetails 
          profile={profile} 
          onSubmit={updateProfile} 
        />
      </div>
    </div>
  );
}