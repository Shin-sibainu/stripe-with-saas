"use client";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const SubscribeButton = ({ planId }: { planId: string }) => {
  const processSubscription = async (planId: string) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/subscription/${planId}`
    );
    // console.log(data);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <button onClick={async () => processSubscription(planId)}>
      プランに契約する
    </button>
  );
};

export default SubscribeButton;
