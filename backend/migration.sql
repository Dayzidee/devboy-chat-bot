-- Supabase Migration Script

-- 1. Create the public.users table
-- This table will store public user information that is safe to expose to clients.
-- It is linked to the private auth.users table via a foreign key.

CREATE TABLE public.users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL CHECK (char_length(username) >= 3),
    email TEXT UNIQUE NOT NULL,
    avatar TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_update
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE PROCEDURE handle_updated_at();

-- 3. Row Level Security (RLS) Policies
-- These policies restrict access to the data in the public.users table.

-- Enable RLS on the public.users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow users to see all public profiles
CREATE POLICY "Allow read access to all users"
ON public.users
FOR SELECT
USING (true);

-- Policy: Allow users to insert their own profile
CREATE POLICY "Allow users to insert their own profile"
ON public.users
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Allow users to update their own profile
CREATE POLICY "Allow users to update their own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. Create a function to handle new user sign-ups
-- This function will be triggered when a new user signs up in Supabase Auth.
-- It will create a corresponding entry in the public.users table.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (user_id, username, email, avatar)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.email,
    'https://api.dicebear.com/8.x/initials/svg?seed=' || (NEW.raw_user_meta_data->>'username')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create a trigger to execute the handle_new_user function
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();