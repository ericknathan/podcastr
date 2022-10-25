type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  url: string;
  publishedAt: string;
};

export interface EpisodeModel extends Episode {
  durationAsString: string;
}

export interface ApiEpisodeModel
  extends Omit<Episode, 'publishedAt' | 'url' | 'duration'> {
  published_at: string;
  file: {
    url: string;
    duration: number;
  };
}

export type PlayerEpisodeModel = Omit<
  EpisodeModel,
  'file' | 'description' | 'publishedAt'
>;
