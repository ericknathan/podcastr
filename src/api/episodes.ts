import { EpisodeModel } from "@/types/models";
import episodes from "./database.json";

export async function getEpisodesList(): Promise<EpisodeModel[]> {
  return episodes;
}

export async function getEpisode(id: string): Promise<EpisodeModel | undefined> {
  return episodes.find((episode) => episode.id === id);
}
