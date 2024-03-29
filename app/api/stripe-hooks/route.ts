import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";

export async function POST(req: NextRequest) {
  // console.log("event received");
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const signature = req.headers.get("stripe-signature");
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req, signature, signingSecret);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: `Webhook Error: ${error.message}` },
      { status: 401 }
    );
  }

  console.log({ event });

  return NextResponse.json({ received: true });
}
