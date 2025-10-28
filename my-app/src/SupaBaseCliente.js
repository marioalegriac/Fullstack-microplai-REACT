import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hlgluwdqvencwpgzdowr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsZ2x1d2RxdmVuY3dwZ3pkb3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDAwNTcsImV4cCI6MjA3NzE3NjA1N30.MpRqtXZFibq1S_6ADexA5JW9kJFpq0ql3tv9vmSFAoQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
