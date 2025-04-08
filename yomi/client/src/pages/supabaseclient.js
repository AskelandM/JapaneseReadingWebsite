import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://czccvfxqcvogvqawvgyp.supabase.co";
const supabaseAnonKey =
  "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
