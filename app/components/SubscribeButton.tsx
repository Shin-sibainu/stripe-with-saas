"use client";

import axios from "axios";

const SubscribeButton = ({ planId }: { planId: string }) => {
  const processSubscription = async (planId: string) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/subscription/${planId}`
    );
    console.log(data);
  };

  return (
    <button onClick={async () => processSubscription(planId)}>
      プランに契約する
    </button>
  );
};

export default SubscribeButton;
