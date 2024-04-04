import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import { cookies } from "next/headers";

// export const config = { api: { bodyParser: false } };
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const signature = req.headers.get("stripe-signature")!;
  const signingSecret = process.env.STRIPE_SIGNING_SECRET!;

  // リクエストのバッファをそのまま取得
  const reqBuffer = Buffer.from(await req.arrayBuffer());

  try {
    // バッファをそのままconstructEventに渡す
    const event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      signingSecret
    );

    console.log(event.type);

    switch (event.type) {
      case "customer.subscription.created":
        await supabase
          .from("profile")
          .update({
            is_subscribed: true,
            interval: event.data.object.items.data[0].plan.interval,
          })
          .eq("stripe_customer", event.data.object.customer);
        break;

      case "customer.subscription.updated":
        await supabase
          .from("profile")
          .update({
            is_subscribed: true,
            interval: event.data.object.items.data[0].plan.interval,
          })
          .eq("stripe_customer", event.data.object.customer);

        break;
      case "customer.subscription.deleted":
        await supabase
          .from("profile")
          .update({
            is_subscribed: false,
            interval: null,
          })
          .eq("stripe_customer", event.data.object.customer);

        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: `Webhook Error: ${error.message}` },
      { status: 401 }
    );
  }
}
