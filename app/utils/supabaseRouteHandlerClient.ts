import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const supabaseRouteHandlerClient = () => {
  cookies().getAll();
  return createRouteHandlerClient<Database>({ cookies });
};
