import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export default function middleware() {}
// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });
//   await supabase.auth.getSession();
//   return res;
// }
