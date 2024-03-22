"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const AuthClientButton = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  // console.log(session);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <>
      {session ? (
        <button onClick={handleSignOut} className="text-xs text-gray-400">
          ログアウト
        </button>
      ) : (
        <button onClick={handleSignIn} className="text-xs text-gray-400">
          サインイン
        </button>
      )}
    </>
  );
};

export default AuthClientButton;
