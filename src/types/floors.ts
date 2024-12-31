import type { Database } from './supabase';

export type Floor = Database['public']['Tables']['floors']['Row'];
export type FloorInsert = Database['public']['Tables']['floors']['Insert'];
export type FloorUpdate = Database['public']['Tables']['floors']['Update'];