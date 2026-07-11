import { createClient } from "@supabase/supabase-js";

// Single shared client for the whole app (avoids "multiple GoTrueClient
// instances" warnings and keeps one auth session).
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);
