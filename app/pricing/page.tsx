import initStripe from "stripe";

const getAllPrices = async () => {
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);

      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring?.interval,
        currency: price.currency,
      };
    })
  );

  const sortedPlans = plans.sort((a, b) => a.price! - b.price!);

  return sortedPlans;
};

const PricingPage = async () => {
  const plans = await getAllPrices();

  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {/* <pre>{JSON.stringify(plans, null, 2)}</pre> */}
      {plans.map((plan) => (
        <div key={plan.id} className="w-80 h-40 rounded shadow-md px-6 py-4">
          <h2 className="text-xl">{plan.name}</h2>
          <p className="text-gray-500">
            {plan.price!}円 / {plan.interval}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PricingPage;
