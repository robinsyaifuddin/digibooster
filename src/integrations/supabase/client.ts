
import { createClient } from '@supabase/supabase-js';

// Public Supabase URL and anon key - these are safe to use in client-side code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Add a custom method for testing connection
export const testSupabaseConnection = async () => {
  try {
    // Simple query to test the connection
    const { data, error } = await supabase.from('test_connection').select('*').limit(1);
    
    if (error) {
      console.error('Supabase connection test error:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error during Supabase connection test:', error);
    return { success: false, error };
  }
};
