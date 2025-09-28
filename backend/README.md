# Backend Setup and Supabase Migration Guide

This guide provides instructions on how to set up the backend and migrate your application from a self-hosted MongoDB setup to Supabase.

## 1. Environment Setup

To run the backend server, you need to set up your environment variables.

1.  Create a `.env` file in the `backend` directory.
2.  Add the following variables to the `.env` file:

    ```
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

You can find your `SUPABASE_URL` and `SUPABASE_ANON_KEY` in your Supabase project's **API settings**.
- Go to **Project Settings** > **API**.
- The **Project URL** is your `SUPABASE_URL`.
- The **Project API Keys** section contains the `anon` `public` key, which is your `SUPABASE_ANON_KEY`.

## 2. Set up your Supabase Project

Before you begin, make sure you have a Supabase project set up. If you don't have one, go to [supabase.com](https://supabase.com) to create a new project.

## 3. Run the Migration Script

The `migration.sql` script in this directory is designed to set up your Supabase database with the necessary tables, triggers, and row-level security policies.

To run the script:
1. In your Supabase project, go to the **SQL Editor**.
2. Click on **New query**.
3. Copy the entire content of `migration.sql` and paste it into the SQL editor.
4. Click **Run**.

This will create a `public.users` table that is linked to Supabase's built-in `auth.users` table. It also sets up a trigger to automatically create a public user profile when a new user signs up.

## 4. Data Migration (Optional)

If you have existing user data from a MongoDB database, you can migrate it to Supabase. Due to security best practices, user passwords cannot be migrated. Users will need to reset their passwords or sign up again.

To migrate user data (without passwords):
1. **Export your data from MongoDB:** Export your `users` collection to a CSV or JSON file.
2. **Import your data into Supabase:**
   - In your Supabase project, go to the **Table Editor**.
   - Select the `public.users` table.
   - Click **Insert** > **Import data from CSV**.
   - Upload your CSV file and map the columns to the corresponding fields in the `public.users` table.

**Important:** You will need to manually create users in Supabase Auth first to get their `id`s. Then, map the `user_id` column from your exported data to the `user_id` column in the `public.users` table, ensuring it corresponds to the `id` of the user in the `auth.users` table.

## 5. Running the Application

Once you have set up your environment variables and your Supabase project, you can run the backend server.

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

The server will be running on the port specified in your `server.ts` file (default is 8000).