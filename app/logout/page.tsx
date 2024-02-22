"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.signOut();
    router.push("/");
  }, []);

  return <div>Logout</div>;
};

export default Logout;
