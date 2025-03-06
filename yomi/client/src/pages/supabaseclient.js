import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://notjvbqalqgyoxlkkggl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vdGp2YnFhbHFneW94bGtrZ2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyOTA5MjQsImV4cCI6MjA1NDg2NjkyNH0.FDO82Dh-jKV9Sb9mqUXe4jCPOOzdBjr9yQDLg_5n0Xs";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
