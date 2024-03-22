import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const supabase = createRouteHandlerClient({ cookies });

export async function GET(req: NextRequest, res: NextResponse) {
  const { data: session } = await supabase.auth.getUser();

  const user = session.user;

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { data: stripe_customer } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user?.id)
    .single();

  return NextResponse.json({
    ...user,
    stripe_customer,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {}
