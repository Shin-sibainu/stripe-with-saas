"use client";

import { supabase } from "@/utils/supabase";
import React, { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }, []);

  return <div>Login</div>;
};

export default Login;
