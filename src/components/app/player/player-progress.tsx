"use client";

import { Slider } from "@/components/ui";
import { convertDurationToTimeString } from "@/lib/utils";
import { useState } from "react";

export function PlayerProgress({ duration = 0 }) {
  const [progress, setProgress] = useState(0);

  function handleSeek(value: number[]) {
    console.log(value[0]);
    // TODO: set audio progress
  }

  return (
    <div className="flex items-center w-full gap-4">
      <span className="text-white tabular-nums">
        {convertDurationToTimeString(progress)}
      </span>
      {!!duration && duration !== 0 ? (
        <Slider
          onValueChange={(value) => setProgress(value[0])}
          onValueCommit={handleSeek}
          value={[progress]}
          max={duration}
        />
      ) : (
        <div className="flex-1 h-1 bg-white/20 rounded-full" />
      )}
      <span className="text-white tabular-nums">
        {convertDurationToTimeString(duration)}
      </span>
    </div>
  );
}
