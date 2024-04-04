import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";
import { Database } from "./lib/database.types";

//tutorialshin@gmail.com
//https://github.com/Shin-sibainu/small-sns-clone

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const getAllLessons = async () => {
    const { data: lessons } = await supabase.from("lesson").select("*");
    return lessons;
  };

  const getProfileData = async () => {
    const { data: profile } = await supabase
      .from("profile")
      .select("*")
      .single();
    return profile;
  };
  const { data: session } = await supabase.auth.getSession();

  const [lessons, profile] = await Promise.all([
    getAllLessons(),
    getProfileData(),
  ]);

  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons?.map((lesson) => (
        <Link
          href={`/${lesson.id}`}
          key={lesson.id}
          className="p-8 h-40 mb-4 rounded shadow-md text-xl flex"
        >
          {lesson.title}
        </Link>
      ))}
    </main>
  );
}
