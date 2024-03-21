import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";

//stripeへのユーザー保存＆profileのstripe_customerへのcustomer.idの保存
export async function POST(req: NextRequest) {
  //ここのidとemailの指定ができてない。
  const data = await req.json();
  const { id, email } = data.record;

  //get query
  const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
  if (query !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json({
      message: "You are not authorized to call this API",
    });
  }

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

  const customer = await stripe.customers.create({
    email,
  });

  await supabase
    .from("profile")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", id);

  return NextResponse.json({
    message: `stripe customer created: ${customer.id}`,
  });
}
