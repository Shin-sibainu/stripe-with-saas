"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="border-2 px-4 py-2 rounded-md border-slate-500"
    >
      Logout
    </button>
  );
};

export default Logout;
