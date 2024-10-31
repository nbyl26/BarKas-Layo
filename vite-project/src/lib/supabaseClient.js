import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iohixtdfeecwyesvwtgf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvaGl4dGRmZWVjd3llc3Z3dGdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzODgzMDAsImV4cCI6MjA0NTk2NDMwMH0.XiT2ux8JjW_W685HyEdoQm8BKvH299Zarqhm78Gyxfw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
