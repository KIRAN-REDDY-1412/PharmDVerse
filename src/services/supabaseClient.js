import { createClient } from '@supabase/supabase-js';

const getSupabaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) {
    return import.meta.env.VITE_SUPABASE_URL;
  }
  return 'https://gcsckxmvhdnkqntgxazq.supabase.co';
};

const getSupabaseAnonKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return import.meta.env.VITE_SUPABASE_ANON_KEY;
  }
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjc2NreG12aGRuaGRua3FudGd4YXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNTczODYsImV4cCI6MjEwMDczMzM4Nn0.yuJ0R4wcwa5tkSQ6KUhVHPnRfB3Y2d1Y2coCJbVAfzM';
};

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
