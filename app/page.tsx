import { supabase } from "@/utils/supabase";
import Link from "next/link";

const getAllLessons = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");
  return lessons;
};

export default async function Home() {
  console.log(supabase.auth.getUser());
  const lessons = await getAllLessons();
  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons?.map((lesson) => (
        <Link
          href={`/${lesson.id}`}
          key={lesson.id}
          className="p-8 h-40 mb-4 rounded shadow text-xl flex"
        >
          {lesson.title}
        </Link>
      ))}
    </main>
  );
}
