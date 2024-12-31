/*
  # Create floors table for AI services

  1. New Tables
    - `floors`
      - `id` (uuid, primary key)
      - `floor_number` (integer, unique)
      - `name` (text)
      - `icon` (text)
      - `color` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on `floors` table
    - Add policy for public read access
    - Add policy for authenticated users to create new floors
*/

CREATE TABLE IF NOT EXISTS floors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  floor_number integer UNIQUE NOT NULL,
  name text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE floors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read floors
CREATE POLICY "Floors are viewable by everyone"
  ON floors
  FOR SELECT
  USING (true);

-- Allow authenticated users to create new floors
CREATE POLICY "Authenticated users can create floors"
  ON floors
  FOR INSERT
  TO authenticated
  WITH CHECK (true);