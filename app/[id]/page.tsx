import { supabase } from "@/utils/supabase";

const getDetailLesson = async (id: number) => {
  const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", id)
    .single();
  return lesson;
};

const LessonDetails = async ({ params }: { params: { id: number } }) => {
  const detailLesson = await getDetailLesson(params.id);
  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{detailLesson.title}</h1>
      <p>{detailLesson.description}</p>
    </div>
  );
};

export default LessonDetails;
