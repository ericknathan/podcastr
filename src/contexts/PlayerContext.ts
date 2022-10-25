import create from 'zustand';

import { PlayerEpisodeModel } from '../@types/models/Episode';

interface IPlayerContext {
  episodeList: PlayerEpisodeModel[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: PlayerEpisodeModel) => void;
  playList: (list: PlayerEpisodeModel[], index: number) => void;
  playPrevious: () => void;
  playNext: () => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (isPlaying: boolean) => void;
  clearPlayerState: () => void;
}

export const usePlayer = create<IPlayerContext>((set) => ({
  episodeList: [],
  currentEpisodeIndex: 0,
  isPlaying: false,
  isLooping: false,
  isShuffling: false,

  play: (episode: PlayerEpisodeModel) => {
    set((state) => ({
      ...state,
      episodeList: [episode],
      currentEpisodeIndex: 0,
      isPlaying: true,
    }));
  },

  playList: (list: PlayerEpisodeModel[], index: number) => {
    set((state) => ({
      ...state,
      episodeList: list,
      currentEpisodeIndex: index,
      isPlaying: true,
    }));
  },

  playNext: () => {
    set((state) => {
      const currentEpisodeIndex = state.currentEpisodeIndex;
      let nextEpisodeIndex = currentEpisodeIndex + 1;

      const episodeListSize = state.episodeList.length;
      const hasNext = hasNextCondition(state);

      if (state.isShuffling) {
        const randomEpisodeIndex = Math.floor(Math.random() * episodeListSize);
        nextEpisodeIndex = randomEpisodeIndex;
      }

      return {
        ...state,
        currentEpisodeIndex: hasNext ? nextEpisodeIndex : currentEpisodeIndex,
      };
    });
  },

  playPrevious: () => {
    set((state) => {
      const currentEpisodeIndex = state.currentEpisodeIndex;
      const previousEpisodeIndex = currentEpisodeIndex - 1;

      const hasPrevious = currentEpisodeIndex > 0;

      return {
        ...state,
        currentEpisodeIndex: hasPrevious
          ? previousEpisodeIndex
          : currentEpisodeIndex,
      };
    });
  },

  togglePlay: () => set((state) => ({ ...state, isPlaying: !state.isPlaying })),

  toggleLoop: () => set((state) => ({ ...state, isLooping: !state.isLooping })),

  toggleShuffle: () =>
    set((state) => ({ ...state, isShuffling: !state.isShuffling })),

  setPlayingState: (isPlaying: boolean) =>
    set((state) => ({ ...state, isPlaying })),

  clearPlayerState: () =>
    set(() => ({
      episodeList: [],
      currentEpisodeIndex: 0,
    })),
}));

export const hasPreviousCondition = (state: IPlayerContext) =>
  state.currentEpisodeIndex > 0;

export const hasNextCondition = (state: IPlayerContext) =>
  state.isShuffling || state.currentEpisodeIndex + 1 < state.episodeList.length;
