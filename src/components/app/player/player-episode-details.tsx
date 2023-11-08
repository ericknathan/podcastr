import { EpisodeModel } from "@/types/models";
import Image from "next/image";

interface PlayerEpisodeDetailsProps {
  episode: EpisodeModel;
}

export function PlayerEpisodeDetails({ episode }: PlayerEpisodeDetailsProps) {
  return (
    <div className="flex xl:flex-col justify-between max-md:text-end md:justify-start items-center xl:items-start gap-4 xl:gap-8">
      <Image
        src={episode.thumbnail}
        alt={`Thumbnail of ${episode.title}`}
        className="bg-gradient-linear aspect-square w-12 h-12 md:w-16 md:h-16 rounded xl:w-full xl:h-auto xl:rounded-3xl object-cover"
        width={500}
        height={750}
      />
      <div className="flex flex-col xl:items-center xl:gap-2">
        <h2
          className="text-lg xl:text-2xl text-white w-full line-clamp-1 md:line-clamp-2"
          title={episode.title}
        >
          {episode.title}
        </h2>
        <p className="text-white/70 text-sm xl:text-base line-clamp-1">
          {episode.members}
        </p>
      </div>
    </div>
  );
}
