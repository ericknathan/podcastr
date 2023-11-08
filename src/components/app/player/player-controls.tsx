import { cn } from "@/lib/utils";
import Image from "next/image";

function ControlActionButton({
  alt,
  className,
  src,
  ...props
}: { alt: string; src: string } & React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "flex items-center justify-center w-10 xl:w-12 aspect-square p-2 xl:p-3 bg-primary-500 hover:brightness-95 transition-filter rounded-md",
        "focus-visible:outline outline-2 outline-primary-300",
        className
      )}
      {...props}
    >
      <Image src={src} alt={alt} width={24} height={24} className="w-full" />
    </button>
  );
}

interface PlayerControlsProps {
  disabled?: boolean;
}

export function PlayerControls({ disabled }: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      <ControlActionButton
        src="/shuffle.svg"
        alt="Two arrows crossing each other"
        title="Shuffle songs"
        disabled={disabled}
      />
      <ControlActionButton
        src="/play-previous.svg"
        alt="Arrow pointing to the left"
        title="Previous song"
        disabled={disabled}
      />
      <ControlActionButton
        src="/play.svg"
        alt="Play button"
        title="Play"
        disabled={disabled}
        className="bg-primary-800 w-14 xl:w-16 mx-3 rounded-2xl"
      />
      <ControlActionButton
        src="/play-next.svg"
        alt="Arrow pointing to the right"
        title="Next song"
        disabled={disabled}
      />
      <ControlActionButton
        src="/repeat.svg"
        alt="Two arrows forming a circle"
        title="Repeat song"
        disabled={disabled}
      />
    </div>
  );
}
