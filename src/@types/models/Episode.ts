export interface EpisodeModel {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

export interface ApiEpisodeModel
  extends Omit<
    EpisodeModel,
    'publishedAt' | 'durationAsString' | 'url' | 'duration'
  > {
  published_at: string;
  file: {
    url: string;
    duration: number;
  };
}
