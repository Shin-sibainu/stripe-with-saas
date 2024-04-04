import React from "react";
import ManageSubscriptionButton from "../components/ManageSubscriptionButton";
import { supabaseServer } from "../utils/supabaseServer";

const DashBoard = async () => {
  const supabase = supabaseServer();

  const getProfileData = async () => {
    const { data: profile } = await supabase
      ?.from("profile")
      .select("*")
      .single();
    return profile;
  };

  const profile = await getProfileData();

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">ユーザー管理ダッシュボード</h1>
      <div>
        <div>
          {profile?.is_subscribed
            ? `プラン契約中: ${profile.interval}`
            : "プラン未加入です。"}
          <ManageSubscriptionButton />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
