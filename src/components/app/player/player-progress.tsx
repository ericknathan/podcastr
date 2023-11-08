"use client";

import { Slider } from "@/components/ui";
import { usePlayer } from "@/contexts";
import { convertDurationToTimeString } from "@/lib/utils";
import { EpisodeModel } from "@/types/models";
import { useEffect, useRef, useState } from "react";

interface PlayerProgressProps {
  episode: EpisodeModel;
}

export function PlayerProgress({ episode }: PlayerProgressProps) {
  const {
    isLooping,
    isPlaying,
    hasNext,
    playNext,
    clearPlayerState,
    setPlayingState,
  } = usePlayer();
  const [isChangingValue, setIsChangingValue] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleSeek(value: number[]) {
    const progress = value[0];

    audioRef.current!.currentTime = progress;
    setProgress(progress);
  }


  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current!.currentTime = 0;

    audioRef.current!.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRef.current!.currentTime));
    });
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  return (
    <div className="flex items-center w-full gap-4">
      <span className="text-white tabular-nums">
        {convertDurationToTimeString(progress)}
      </span>
      {episode ? (
        <Slider
          onValueCommit={handleSeek}
          max={episode.file.duration}
          value={[progress]}
          onValueChange={handleSeek}
        />
      ) : (
        <div className="flex-1 h-1 bg-white/20 rounded-full" />
      )}
      <span className="text-white tabular-nums">
        {convertDurationToTimeString(episode?.file.duration || 0)}
      </span>

      {episode && (
        <audio
          src={episode.file.url}
          ref={audioRef}
          loop={isLooping}
          autoPlay
          onEnded={handleEpisodeEnded}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
          onLoadedMetadata={setupProgressListener}
        />
      )}
    </div>
  );
}
