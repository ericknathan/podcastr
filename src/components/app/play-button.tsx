import Image from "next/image";

export function PlayButton() {
  return (
    <button className="flex items-center justify-center border w-10 h-10 aspect-square rounded-lg bg-white hover:brightness-95 transition-filter focus-visible:outline-secondary-500">
      <Image src="/play-green.svg" alt="" width={24} height={24} />
    </button>
  );
}
