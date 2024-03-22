import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import initStripe, { Stripe } from "stripe";
import { cookies } from "next/headers";

interface Plan {
  id: string;
  name: string;
  price: number | null;
  interval: Stripe.Price.Recurring.Interval | null;
  currency: string;
}

const supabase = createServerComponentClient({ cookies });

const getAllPrices = async (): Promise<Plan[]> => {
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

  const { data: prices } = await stripe.prices.list();

  const plans: Plan[] = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product as string);

      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring?.interval ?? null,
        currency: price.currency,
      };
    })
  );

  const sortedPlans: Plan[] = plans.sort((a, b) => a.price! - b.price!);

  return sortedPlans;
};

const getProfileData = async () => {
  const { data: profile } = await supabase.from("profile").select("*").single();
  return profile;
};

const PricingPage = async () => {
  const { data: session } = await supabase.auth.getSession();

  const [plans, profile] = await Promise.all([
    await getAllPrices(),
    await getProfileData(),
  ]);

  //!!はブール値に強制変換する。
  const showSubscribeButton = !!session && !profile.is_subscribed; //ログインしているが、プラン契約していない
  const showCreateAccountButton = !session; //ログインしていない
  const showManageSubscriptionButton = !!session && profile.is_subscribed; //ログインもしていて、プラン契約もしている

  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {/* <pre>{JSON.stringify(plans, null, 2)}</pre> */}
      {plans.map((plan) => (
        <div key={plan.id} className="w-80 h-40 rounded shadow-md px-6 py-4">
          <h2 className="text-xl">{plan.name}</h2>
          <p className="text-gray-500">
            {plan.price!}円 / {plan.interval}
          </p>
          {showSubscribeButton && <button>プランを契約する</button>}
          {showCreateAccountButton && <button>アカウントを作る</button>}
          {showManageSubscriptionButton && <button>プランを管理する</button>}
        </div>
      ))}
    </div>
  );
};

export default PricingPage;