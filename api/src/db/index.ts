import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import dotenv from 'dotenv';
dotenv.config();

// Create a single supabase client for interacting with your database
const DATABASE_API_KEY = process.env.DATABASE_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
// const { DATABASE_URL, DATABASE_API_KEY } = process.env;

if (!DATABASE_URL || !DATABASE_API_KEY) {
  throw new Error('DATABASE_URL and DATABASE_API_KEY must be set');
}

const db = createClient<Database>(DATABASE_URL!, DATABASE_API_KEY!);

export { db };
