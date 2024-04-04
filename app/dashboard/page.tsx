import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import ManageSubscriptionButton from "../components/ManageSubscriptionButton";

export const dynamic = "force-dynamic";

const DashBoard = async () => {
  cookies().getAll();
  const supabase = createServerComponentClient<Database>({ cookies });

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
