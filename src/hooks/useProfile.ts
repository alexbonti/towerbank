import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { Profile } from '../types/profiles';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  async function loadProfile() {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        setProfile(data);
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({ id: user.id })
          .select()
          .single();
          
        if (newProfile) {
          setProfile(newProfile);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfile(newData: Partial<Profile>) {
    if (!user) return;

    await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...newData,
        updated_at: new Date().toISOString()
      });
    
    await loadProfile();
  }

  async function handleAvatarChange(file: File) {
    if (!user) return;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${user.id}/${Date.now()}`, file);
    
    if (!error && data) {
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path);

      await updateProfile({ ...profile, avatar_url: publicUrl });
    }
  }

  return {
    profile,
    isLoading,
    updateProfile,
    handleAvatarChange
  };
}