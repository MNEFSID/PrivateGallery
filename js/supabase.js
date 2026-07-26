const SUPABASE_URL = "https://wlujkhwclvizukxgmgot.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdWpraHdjbHZpenVreGdtZ290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNTcxMzYsImV4cCI6MjEwMDYzMzEzNn0.JrdLINPTYV2_YB53Ob1xz-XQKteGIP_LsDsPuzOC0SY";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);