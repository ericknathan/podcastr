import { api } from "@/lib/api";
import { convertDurationToTimeString, formatShortDate } from "@/lib/utils";
import { EpisodeModel } from "@/types/models";
import { EpisodeBanner } from "./components";

export default async function EpisodePage({
  params,
}: {
  params: { slug: string };
}) {
  const episode = await api.get<EpisodeModel>(
    `/podcasts/episodes/${params.slug}`
  );

  return (
    <div className="max-w-[46rem] w-full mx-auto p-12 flex flex-col gap-8">
      <EpisodeBanner episode={episode} />
      <header className="px-4">
        <h1 className="text-2xl sm:text-3xl">{episode.title}</h1>
        <div className="flex flex-wrap items-center gap-4 py-4 border-b text-sm">
          <span className="line-clamp-1">{episode.members}</span>
          <div className="max-sm:hidden w-1 h-1 rounded-full bg-gray-200" />
          <span className="whitespace-nowrap">
            {formatShortDate(new Date(episode.published_at))}
          </span>
          <div className="w-1 h-1 rounded-full bg-gray-200" />
          <span className="whitespace-nowrap">
            {convertDurationToTimeString(episode.file.duration)}
          </span>
        </div>
      </header>
      <div
        className="flex flex-col gap-6 text-gray-800 px-4"
        dangerouslySetInnerHTML={{
          __html: episode.description,
        }}
      />
    </div>
  );
}
