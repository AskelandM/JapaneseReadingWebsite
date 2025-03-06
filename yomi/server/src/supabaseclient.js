import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://czccvfxqcvogvqawvgyp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6Y2N2ZnhxY3ZvZ3ZxYXd2Z3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NDUzOTEsImV4cCI6MjA1NjUyMTM5MX0.5cwyJrFdwrESexbu9RltXzjS1JVzxb-bfTJXztI4_KM";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
