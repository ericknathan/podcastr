import { NextResponse } from "next/server";

import episodes from "../database.json";

export function GET(_: undefined, { params }: { params: { slug: string } }) {
  const episode = episodes.find((episode) => episode.id === params.slug);
  return NextResponse.json(episode);
}