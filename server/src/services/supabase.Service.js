// server/src/lib/supabase.js (or any init file)
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';


const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
if (!url || !key) {
    throw new Error('Missing Supabase URL or Key in environment variables');
}
const supabase = createClient(
    url, key
);

export default supabase;
