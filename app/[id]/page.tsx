import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { YouTubeEmbed } from "@next/third-parties/google";
import { extractYouTubeVideoId } from "../utils/extractYoutubeVideoId";
import { Database } from "../lib/database.types";
import { supabaseServer } from "../utils/supabaseServer";

const LessonDetails = async ({ params }: { params: { id: number } }) => {
  const supabase = supabaseServer();

  const getDetailLesson = async (
    id: number,
    supabase: SupabaseClient<Database>
  ) => {
    const { data: lesson } = await supabase
      .from("lesson")
      .select("*")
      .eq("id", id)
      .single();
    return lesson;
  };

  const getPremiumContent = async (
    id: number,
    supabase: SupabaseClient<Database>
  ) => {
    const { data: video } = await supabase
      .from("premium_content")
      .select("video_url")
      .eq("id", id)
      .single();

    return video;
  };

  const [detailLesson, video] = await Promise.all([
    await getDetailLesson(params.id, supabase),
    await getPremiumContent(params.id, supabase),
  ]);
  const videoId = extractYouTubeVideoId(video?.video_url!) as string;

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{detailLesson?.title}</h1>
      <p className="mb-8">{detailLesson?.description}</p>
      <YouTubeEmbed height={400} videoid={videoId} />
    </div>
  );
};

export default LessonDetails;
