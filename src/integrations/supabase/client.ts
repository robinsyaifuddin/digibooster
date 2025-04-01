
import { createClient } from '@supabase/supabase-js';

// Public Supabase URL and anon key - these are safe to use in client-side code
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
