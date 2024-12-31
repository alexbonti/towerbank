export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      floors: {
        Row: {
          id: string
          floor_number: number
          name: string
          icon: string
          color: string
          description: string
          created_at: string
          created_by: string | null
          website_url: string | null
          youtube_url: string | null
        }
        Insert: {
          id?: string
          floor_number: number
          name: string
          icon: string
          color: string
          description: string
          created_at?: string
          created_by?: string | null
          website_url?: string | null
          youtube_url?: string | null
        }
        Update: {
          id?: string
          floor_number?: number
          name?: string
          icon?: string
          color?: string
          description?: string
          created_at?: string
          created_by?: string | null
          website_url?: string | null
          youtube_url?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          linkedin_url: string | null
          role: string | null
          description: string | null
          avatar_url: string | null
          media_urls: Json[]
          contact_info: Json
          updated_at: string
        }
        Insert: {
          id: string
          linkedin_url?: string | null
          role?: string | null
          description?: string | null
          avatar_url?: string | null
          media_urls?: Json[]
          contact_info?: Json
          updated_at?: string
        }
        Update: {
          linkedin_url?: string | null
          role?: string | null
          description?: string | null
          avatar_url?: string | null
          media_urls?: Json[]
          contact_info?: Json
          updated_at?: string
        }
      }
    }
  }
}