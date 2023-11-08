"use client";

import Image from "next/image";

import { usePlayer } from "@/contexts";
import { cn } from "@/lib/utils";

function ControlActionButton({
  active,
  alt,
  className,
  src,
  ...props
}: {
  active?: boolean;
  alt: string;
  src: string;
} & React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "flex items-center justify-center w-10 xl:w-12 aspect-square p-2 xl:p-3 bg-primary-500 enabled:hover:brightness-95 disabled:opacity-50 transition-filter rounded-md",
        "focus-visible:outline outline-2 outline-primary-300",
        active && "relative after:content-[''] after:w-1 after:h-1 after:rounded-full after:bg-secondary-500 after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2",
        className
      )}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        width={24}
        height={24}
        className={cn("w-full", active && "secondary-filter")}
      />
    </button>
  );
}

interface PlayerControlsProps {
  disabled?: boolean;
}

export function PlayerControls({ disabled }: PlayerControlsProps) {
  const {
    isPlaying,
    togglePlay,
    isShuffling,
    toggleShuffle,
    isLooping,
    toggleLoop,
    hasPrevious,
    playPrevious,
    hasNext,
    playNext,
  } = usePlayer();

  return (
    <div className="flex items-center justify-center gap-0.5">
      <ControlActionButton
        src="/shuffle.svg"
        alt="Two arrows crossing each other"
        title="Shuffle songs"
        disabled={disabled || (!hasPrevious && !hasNext)}
        onClick={toggleShuffle}
        active={isShuffling}
      />
      <ControlActionButton
        src="/play-previous.svg"
        alt="Arrow pointing to the left"
        title="Previous song"
        disabled={disabled || !hasPrevious}
        onClick={playPrevious}
      />
      <ControlActionButton
        src={isPlaying ? "/pause.svg" : "/play.svg"}
        alt={isPlaying ? "Pause icon" : "Play icon"}
        title={isPlaying ? "Pause" : "Play"}
        disabled={disabled}
        onClick={togglePlay}
        className="bg-primary-800 w-14 xl:w-16 mx-3 rounded-2xl"
      />
      <ControlActionButton
        src="/play-next.svg"
        alt="Arrow pointing to the right"
        title="Next song"
        disabled={disabled || !hasNext}
        onClick={playNext}
      />
      <ControlActionButton
        src="/repeat.svg"
        alt="Two arrows forming a circle"
        title="Repeat song"
        disabled={disabled}
        onClick={toggleLoop}
        active={isLooping}
      />
    </div>
  );
}
