import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://czccvfxqcvogvqawvgyp.supabase.co";
const supabaseAnonKey =
  "M";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
