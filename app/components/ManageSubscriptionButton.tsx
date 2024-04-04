"use client";

import { useRouter } from "next/navigation";

const ManageSubscriptionButton = () => {
  const router = useRouter();

  const loadPortal = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/portal`
    );
    const data = await response.json();
    router.push(data.url);
  };

  return (
    <div>
      <button onClick={loadPortal}>サブスクリプション管理</button>
    </div>
  );
};

export default ManageSubscriptionButton;
