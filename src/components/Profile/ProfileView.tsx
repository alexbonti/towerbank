import React from 'react';
import type { Database } from '../../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileViewProps {
  profile: Profile;
}

export default function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-4">
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-bold">{profile.role}</h2>
          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn Profile
            </a>
          )}
        </div>
      </div>

      {profile.description && (
        <p className="mt-4 text-gray-600">{profile.description}</p>
      )}

      {profile.contact_info && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <pre className="bg-gray-50 p-2 rounded">
            {JSON.stringify(profile.contact_info, null, 2)}
          </pre>
        </div>
      )}

      {profile.media_urls && profile.media_urls.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Media</h3>
          <div className="grid grid-cols-2 gap-4">
            {profile.media_urls.map((url, index) => (
              <a
                key={index}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Media {index + 1}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}