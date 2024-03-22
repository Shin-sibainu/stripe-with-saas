import React from "react";
import AuthClientButton from "./AuthClientButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const AuthServerButton = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: user } = await supabase.auth.getSession();
  const session = user.session;

  return <AuthClientButton session={session} />;
};

export default AuthServerButton;
