import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABSE_URL!,
  process.env.NEXT_PUBLIC_SUPABSE_KEY!
);
