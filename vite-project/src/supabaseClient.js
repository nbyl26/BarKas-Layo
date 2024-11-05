import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kyjylvsrivnvgvjixygf.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5anlsdnNyaXZudmd2aml4eWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MjE1NDcsImV4cCI6MjA0NjM5NzU0N30.KvoaBH30XI9N93pkQ1UiFKaDqa-roOyJ1PZoj9Oi8NA'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
