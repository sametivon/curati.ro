/*
  # Curatify Marketplace Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `phone` (text)
      - `avatar_url` (text)
      - `user_type` (text: 'client' or 'cleaner')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `cleaners`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `bio` (text)
      - `hourly_rate` (numeric)
      - `city` (text)
      - `rating` (numeric, default 0)
      - `total_reviews` (integer, default 0)
      - `verified` (boolean, default false)
      - `created_at` (timestamptz)

    - `services`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text: 'home', 'office', 'garden')
      - `icon` (text)
      - `created_at` (timestamptz)

    - `cleaner_services`
      - `id` (uuid, primary key)
      - `cleaner_id` (uuid, references cleaners)
      - `service_id` (uuid, references services)
      - `created_at` (timestamptz)

    - `bookings`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references profiles)
      - `cleaner_id` (uuid, references cleaners)
      - `service_id` (uuid, references services)
      - `booking_date` (date)
      - `booking_time` (time)
      - `status` (text: 'pending', 'accepted', 'completed', 'cancelled')
      - `task_details` (text)
      - `created_at` (timestamptz)

    - `reviews`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `cleaner_id` (uuid, references cleaners)
      - `client_id` (uuid, references profiles)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for cleaners to view their bookings and reviews
    - Add policies for clients to view cleaner profiles and create bookings
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text,
  avatar_url text,
  user_type text NOT NULL CHECK (user_type IN ('client', 'cleaner')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create cleaners table
CREATE TABLE IF NOT EXISTS cleaners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  bio text DEFAULT '',
  hourly_rate numeric NOT NULL DEFAULT 0,
  city text NOT NULL,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews integer DEFAULT 0,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cleaners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cleaner profiles"
  ON cleaners FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Cleaners can update own profile"
  ON cleaners FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Cleaners can insert own profile"
  ON cleaners FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL CHECK (category IN ('home', 'office', 'garden')),
  icon text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

-- Create cleaner_services junction table
CREATE TABLE IF NOT EXISTS cleaner_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cleaner_id uuid NOT NULL REFERENCES cleaners(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(cleaner_id, service_id)
);

ALTER TABLE cleaner_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cleaner services"
  ON cleaner_services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Cleaners can manage own services"
  ON cleaner_services FOR ALL
  TO authenticated
  USING (cleaner_id IN (SELECT id FROM cleaners WHERE user_id = auth.uid()))
  WITH CHECK (cleaner_id IN (SELECT id FROM cleaners WHERE user_id = auth.uid()));

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cleaner_id uuid NOT NULL REFERENCES cleaners(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id),
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'completed', 'cancelled')),
  task_details text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Cleaners can view bookings for them"
  ON bookings FOR SELECT
  TO authenticated
  USING (cleaner_id IN (SELECT id FROM cleaners WHERE user_id = auth.uid()));

CREATE POLICY "Clients can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Cleaners can update their bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (cleaner_id IN (SELECT id FROM cleaners WHERE user_id = auth.uid()))
  WITH CHECK (cleaner_id IN (SELECT id FROM cleaners WHERE user_id = auth.uid()));

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  cleaner_id uuid NOT NULL REFERENCES cleaners(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(booking_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Clients can create reviews for completed bookings"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    client_id = auth.uid() 
    AND EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = booking_id 
      AND bookings.client_id = auth.uid() 
      AND bookings.status = 'completed'
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cleaners_city ON cleaners(city);
CREATE INDEX IF NOT EXISTS idx_cleaners_rating ON cleaners(rating DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_client ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_cleaner ON bookings(cleaner_id);
CREATE INDEX IF NOT EXISTS idx_reviews_cleaner ON reviews(cleaner_id);

-- Insert default services
INSERT INTO services (name, description, category, icon) VALUES
  ('House Cleaning', 'Deep cleaning for homes and apartments', 'home', 'home'),
  ('Kitchen Cleaning', 'Professional kitchen and appliance cleaning', 'home', 'utensils'),
  ('Bathroom Cleaning', 'Complete bathroom sanitization', 'home', 'droplet'),
  ('Window Cleaning', 'Interior and exterior window cleaning', 'home', 'square'),
  ('Office Cleaning', 'Commercial office space cleaning', 'office', 'building'),
  ('Carpet Cleaning', 'Deep carpet and upholstery cleaning', 'office', 'square-stack'),
  ('Garden Maintenance', 'Lawn mowing and garden care', 'garden', 'leaf'),
  ('Hedge Trimming', 'Professional hedge and shrub trimming', 'garden', 'scissors')
ON CONFLICT DO NOTHING;
