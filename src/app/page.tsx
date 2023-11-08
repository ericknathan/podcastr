import { api } from "@/lib/api";
import { EpisodeModel } from "@/types/models";

import { EpisodesGrid, EpisodesList } from "@/components/app";

export default async function Home() {
  const episodes = await api.get<EpisodeModel[]>("/podcasts/episodes");

  const episodesList = episodes.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const lastEpisodes = episodesList.slice(0, 2);
  const allEpisodes = episodesList.slice(2);

  return (
    <div className="flex flex-col p-8 md:px-16 gap-8">
      <section id="last-episodes" className="flex flex-col gap-6">
        <h1 className="text-xl text-gray-800">Last episodes</h1>
        <EpisodesGrid list={lastEpisodes} />
      </section>
      <section id="all-episodes" className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl text-gray-800">All episodes</h1>
          <span className="text-sm">{episodes.length} in total</span>
        </header>
        <div className="hidden md:block">
          <EpisodesList list={allEpisodes} />
        </div>
        <div className="md:hidden">
          <EpisodesGrid list={allEpisodes} />
        </div>
      </section>
    </div>
  );
}
