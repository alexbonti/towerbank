/*
  # Add user profiles and enhance floor details

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `linkedin_url` (text)
      - `role` (text)
      - `description` (text)
      - `avatar_url` (text)
      - `media_urls` (jsonb array for multiple media links)
      - `contact_info` (jsonb for various contact methods)
      - `updated_at` (timestamp)

  2. Changes to Floors Table
    - Add `website_url` (text)
    - Add `youtube_url` (text)

  3. Security
    - Enable RLS on profiles table
    - Add policies for profile management
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  linkedin_url text,
  role text,
  description text,
  avatar_url text,
  media_urls jsonb DEFAULT '[]'::jsonb,
  contact_info jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Add new columns to floors table
ALTER TABLE floors ADD COLUMN IF NOT EXISTS website_url text;
ALTER TABLE floors ADD COLUMN IF NOT EXISTS youtube_url text;

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();