"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const CreateUserButton = () => {
  const supabase = createClientComponentClient();

  const handleCreateUser = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return <button onClick={handleCreateUser}>アカウントを作る</button>;
};

export default CreateUserButton;
