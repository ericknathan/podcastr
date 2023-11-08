import Image from "next/image";

import { convertDurationToTimeString, formatShortDate } from "@/lib/utils";
import { EpisodeModel } from "@/types/models";

import Link from "next/link";
import { PlayButton } from "./play-button";

interface EpisodesGridProps {
  list: EpisodeModel[];
}

export function EpisodesGrid({ list }: EpisodesGridProps) {
  return (
    <div className="grid xl:grid-cols-2 gap-6">
      {list.map((episode) => (
        <div
          className="flex items-center gap-4 border bg-white p-5 rounded-3xl"
          key={episode.id}
        >
          <Image
            src={episode.thumbnail}
            alt=""
            className="w-24 h-24 bg-primary-500 rounded-xl object-cover aspect-square"
            width={300}
            height={450}
          />
          <div className="flex flex-col gap-2 flex-1">
            <Link href={`/episodes/${episode.id}`} className="hover:underline focus:outline-none focus:underline">
              <h2 className="text-gray-800 line-clamp-2" title={episode.title}>
                {episode.title}
              </h2>
            </Link>
            <footer className="flex items-end justify-between gap-2">
              <div className="flex flex-col gap-2">
                <p className="text-sm line-clamp-1" title={episode.members}>
                  {episode.members}
                </p>
                <div className="inline-flex items-center gap-2 text-sm">
                  <time>{formatShortDate(new Date(episode.published_at))}</time>
                  <div className="w-1 h-1 rounded-full bg-gray-200" />
                  <span>
                    {convertDurationToTimeString(episode.file.duration)}
                  </span>
                </div>
              </div>
              <PlayButton episode={episode} episodeList={list} />
            </footer>
          </div>
        </div>
      ))}
    </div>
  );
}
