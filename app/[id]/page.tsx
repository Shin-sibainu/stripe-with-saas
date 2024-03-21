import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { YouTubeEmbed } from "@next/third-parties/google";
import { extractYouTubeVideoId } from "../utils/extractYoutubeVideoId";

const supabase = createServerComponentClient({ cookies });

const getDetailLesson = async (id: number) => {
  const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", id)
    .single();
  return lesson;
};

const getPremiumContent = async (id: number) => {
  const { data: video } = await supabase
    .from("premium_content")
    .select("video_url")
    .eq("id", id)
    .single();

  return video;
};

const LessonDetails = async ({ params }: { params: { id: number } }) => {
  const detailLesson = await getDetailLesson(params.id);
  const video = await getPremiumContent(params.id);

  const videoId = extractYouTubeVideoId(video?.video_url) as string;

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{detailLesson.title}</h1>
      <p className="mb-8">{detailLesson.description}</p>
      <YouTubeEmbed height={400} videoid={videoId} />
    </div>
  );
};

export default LessonDetails;
