import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import initStripe from "stripe";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { data: stripe_customer_data } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user?.id)
    .single();

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_customer_data?.stripe_customer as string,
    return_url: `${process.env.CLIENT_URL}/dashboard`,
  });

  // console.log(session);

  return NextResponse.json({ url: session.url });
}
