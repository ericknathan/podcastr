import Image from "next/image";
import Link from "next/link";

import { convertDurationToTimeString, formatShortDate } from "@/lib/utils";
import { EpisodeModel } from "@/types/models";

import { PlayButton } from "./play-button";

interface EpisodesListProps {
  list: EpisodeModel[];
}

export function EpisodesList({ list }: EpisodesListProps) {
  return (
    <table cellSpacing={0} className="table-auto w-full">
      <thead>
        <tr className="uppercase text-xs font-medium text-gray-200 text-left border-b">
          <th>Podcast</th>
          <th>Members</th>
          <th>Date</th>
          <th>Duration</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {list.map((episode) => (
          <tr key={episode.id}>
            <td>
              <Link
                href={`/episodes/${episode.id}`}
                className="flex items-center gap-4 hover:underline focus:outline-none focus:underline"
              >
                <Image
                  src={episode.thumbnail}
                  alt={`Thumbnail of ${episode.title}`}
                  width={120}
                  height={120}
                  className="object-cover rounded-lg aspect-square w-10 h-10"
                />
                <h2 className="line-clamp-2" title={episode.title}>
                  {episode.title}
                </h2>
              </Link>
            </td>
            <td className="text-sm">
              <span className="line-clamp-2" title={episode.members}>
                {episode.members}
              </span>
            </td>
            <td className="text-sm whitespace-nowrap">
              <time>{formatShortDate(new Date(episode.published_at))}</time>
            </td>
            <td className="text-sm">
              {convertDurationToTimeString(episode.file.duration)}
            </td>
            <td>
              <PlayButton episode={episode} episodeList={list} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
