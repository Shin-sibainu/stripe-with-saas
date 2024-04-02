import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import AuthServerButton from "../auth/components/AuthServerButton";

const Header = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: user } = await supabase.auth.getSession();

  return (
    <nav className="flex py-4 px-6 border-b border-gray-200">
      <Link href={"/"}>ホーム</Link>
      {!!user.session && (
        <Link href={"/dashboard"} className="ml-4">
          ダッシュボード
        </Link>
      )}
      <Link href={"/pricing"} className="ml-4">
        プラン
      </Link>
      <div className="ml-auto">
        <AuthServerButton />
      </div>
      {/* <Link className="ml-auto" href={user.session ? "/logout" : "/login"}>
        {user.session ? "ログアウト" : "ログイン"}
      </Link> */}
    </nav>
  );
};

export default Header;
