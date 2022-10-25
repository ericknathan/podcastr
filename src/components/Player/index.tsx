import Image from 'next/image';
import Slider from 'rc-slider';

import {
  hasNextCondition,
  hasPreviousCondition,
  usePlayer,
} from '../../contexts/PlayerContext';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {
  const [progress, setProgress] = useState(0);
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playPrevious,
    playNext,
    setPlayingState,
    clearPlayerState,
  } = usePlayer();
  const hasPrevious = usePlayer(hasPreviousCondition);
  const hasNext = usePlayer(hasNextCondition);
  const audioRef = useRef<HTMLAudioElement>(null);

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current!.currentTime = 0;

    audioRef.current!.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current!.currentTime));
    });
  }

  function handleSeek(amount: number) {
    audioRef.current!.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded() {
    if (hasNext) playNext();
    else clearPlayerState();
  }

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            src={episode.thumbnail}
            alt={episode.title}
            width={592}
            height={592}
            objectFit="cover"
          />
          <strong title={episode.title}>{episode.title}</strong>
          <span title={episode.members}>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progressBar}>
          <span>{convertDurationToTimeString(progress)}</span>
          {episode ? (
            <Slider
              max={episode.duration}
              value={progress}
              onChange={handleSeek}
              trackStyle={{ backgroundColor: '#04D361' }}
              railStyle={{ backgroundColor: '#9F75FF' }}
              handleStyle={{ borderColor: '#04D361', borderWidth: 4 }}
            />
          ) : (
            <div className={styles.slider}>
              <div className={styles.emptySlider} />
            </div>
          )}
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            loop={isLooping}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
            onEnded={handleEpisodeEnded}
          />
        )}

        <div className={styles.controls}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button
            type="button"
            disabled={!episode || !hasPrevious}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            disabled={!episode}
            className={styles.playButton}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Pausar" />
            )}
          </button>
          <button
            type="button"
            disabled={!episode || !hasNext}
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
