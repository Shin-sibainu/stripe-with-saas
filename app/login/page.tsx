"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

const Login = () => {
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className="border-2 px-4 py-2 rounded-md border-slate-500"
    >
      Github Login
    </button>
  );
};

export default Login;
