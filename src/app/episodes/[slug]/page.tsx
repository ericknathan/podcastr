import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/api";
import { convertDurationToTimeString, formatShortDate } from "@/lib/utils";
import { EpisodeModel } from "@/types/models";

export default async function EpisodePage({
  params,
}: {
  params: { slug: string };
}) {
  const episode = await api.get<EpisodeModel>(
    `/podcasts/episodes/${params.slug}`
  );

  return (
    <div className="max-w-[46rem] w-full mx-auto p-12 flex flex-col gap-8">
      <div className="relative w-full">
        <Link
          href="/"
          className="absolute left-0 w-12 h-12 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center bg-primary-500 rounded-xl hover:brightness-95 transition-filter focus-visible:outline outline-2 outline-offset-2 outline-primary-500"
        >
          <Image
            src="/arrow-left.svg"
            alt="Arrow Left"
            width={10}
            height={10}
          />
        </Link>
        <Image
          src={episode.thumbnail}
          alt={`Thumbnail of ${episode.title}`}
          width={700}
          height={160}
          className="object-cover h-40 rounded-2xl"
        />
        <button className="absolute right-0 w-12 h-12 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center bg-secondary-500 rounded-xl hover:brightness-95 transition-filter focus-visible:outline outline-2 outline-offset-2 outline-secondary-500">
          <Image src="/play.svg" alt="Play" width={24} height={24} />
        </button>
      </div>
      <header className="px-4">
        <h1 className="text-2xl sm:text-3xl">{episode.title}</h1>
        <div className="flex flex-wrap items-center gap-4 py-4 border-b text-sm">
          <span className="line-clamp-1">{episode.members}</span>
          <div className="max-sm:hidden w-1 h-1 rounded-full bg-gray-200" />
          <span className="whitespace-nowrap">
            {formatShortDate(new Date(episode.published_at))}
          </span>
          <div className="w-1 h-1 rounded-full bg-gray-200" />
          <span className="whitespace-nowrap">
            {convertDurationToTimeString(episode.file.duration)}
          </span>
        </div>
      </header>
      <div
        className="flex flex-col gap-6 text-gray-800 px-4"
        dangerouslySetInnerHTML={{
          __html: episode.description,
        }}
      />
    </div>
  );
}
