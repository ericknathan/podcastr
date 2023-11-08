import Image from "next/image";

import { EpisodeModel } from "@/types/models";
import { PlayerControls } from "./player-controls";
import { PlayerEpisodeDetails } from "./player-episode-details";
import { PlayerProgress } from "./player-progress";
import { cn } from "@/lib/utils";

interface PlayerProps {
  episode?: EpisodeModel;
}

export function Player({ episode }: PlayerProps) {
  return (
    <aside
      className="sticky xl:relative bottom-0 flex flex-col md:flex-row xl:flex-col gap-4 xl:gap-0 justify-between md:items-center p-6 xl:px-16 xl:py-9 bg-primary-500 xl:text-center w-full xl:w-[26.5rem] group"
      data-has-episode={!!episode}
    >
      <header className="hidden xl:flex items-center justify-center gap-4">
        <Image src="/playing.svg" alt="🎧" width={32} height={32} />
        <h1 className="text-white">Playing now</h1>
      </header>

      <main className={cn("flex-1 xl:w-full xl:flex-initial", episode ? "" : "max-xl:h-full")}>
        {!!episode ? (
          <PlayerEpisodeDetails episode={episode} />
        ) : (
          <div className="flex items-center justify-center bg-gradient-linear xl:aspect-square w-full rounded h-full min-h-[3rem] xl:h-auto xl:rounded-3xl text-center border-dashed px-4 border-[1.5px] border-primary-300">
            <h2 className="text-white xl:max-w-[10rem]">
              Select a podcast to listen to
            </h2>
          </div>
        )}
      </main>

      <footer className="flex-1 xl:flex-initial flex flex-col gap-4 md:gap-0 xl:gap-10 group-data-[has-episode='false']:opacity-50 group-data-[has-episode='false']:[&_*]:pointer-events-none">
        <PlayerProgress duration={!episode ? 0 : episode.file.duration} />
        <PlayerControls disabled={!episode} />
      </footer>
    </aside>
  );
}
