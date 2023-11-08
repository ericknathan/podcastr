"use client";

import Image from "next/image";

import { usePlayer } from "@/contexts";
import { EpisodeModel } from "@/types/models";

interface PlayButtonProps {
  episode: EpisodeModel;
  episodeList: EpisodeModel[];
}

export function PlayButton({ episode, episodeList }: PlayButtonProps) {
  const { playList } = usePlayer();

  return (
    <button
      onClick={() => playList(episodeList, episode.id)}
      className="flex items-center justify-center border w-10 h-10 aspect-square rounded-lg bg-white hover:brightness-95 transition-filter focus-visible:outline-secondary-500"
    >
      <Image src="/play-green.svg" alt="" width={24} height={24} />
    </button>
  );
}
