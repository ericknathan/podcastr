"use client";

import { usePlayer } from "@/contexts";
import { EpisodeModel } from "@/types/models";
import Image from "next/image";
import Link from "next/link";

interface EpisodeBannerProps {
  episode: EpisodeModel;
}

export function EpisodeBanner({ episode }: EpisodeBannerProps) {
  const { play } = usePlayer();

  return (
    <div className="relative w-full">
      <Link
        href="/"
        className="absolute left-0 w-12 h-12 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center bg-primary-500 rounded-xl hover:brightness-95 transition-filter focus-visible:outline outline-2 outline-offset-2 outline-primary-500"
      >
        <Image src="/arrow-left.svg" alt="Arrow Left" width={10} height={10} />
      </Link>
      <Image
        src={episode.thumbnail}
        alt={`Thumbnail of ${episode.title}`}
        width={700}
        height={160}
        className="object-cover h-40 rounded-2xl"
      />
      <button
        className="absolute right-0 w-12 h-12 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center bg-secondary-500 rounded-xl hover:brightness-95 transition-filter focus-visible:outline outline-2 outline-offset-2 outline-secondary-500"
        onClick={() => play(episode)}
      >
        <Image src="/play.svg" alt="Play" width={24} height={24} />
      </button>
    </div>
  );
}
