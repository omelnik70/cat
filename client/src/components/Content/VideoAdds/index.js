import React, { useRef } from 'react';

import assets from '../../../assets';
import useVideoPlayer from '../../../hooks/useVideoPlayer';

import styles from './styles.module.scss';

function VideoPlayer({ video, poster, add }) {
  const { ICONS } = assets;
  const { PLAY, PAUSE, VOLUMEFULL, VOLUMEMUTE, FULLSCREEN } = ICONS;
  const { text, link, tagline } = add;
  const videoElement = useRef(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    toggleScreen,
  } = useVideoPlayer(videoElement);
  const { progress, isPlaying, speed, isMuted } = playerState;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {!progress && (<h2 className={styles.tagline}>{tagline}</h2>)}
        <div className={styles.text}>
          <a href={link}>{text}</a>
        </div>
        <video
          src={video}
          poster={poster}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
        />
        <div className={styles.controls}>
          <div className={styles.actions}>
            <button onClick={togglePlay}>
              {!isPlaying ? (
                
                <img src={PLAY} alt=''></img>
              ) : (
                <img src={PAUSE} alt=''></img>
              )}
            </button>
          </div>
          <input
            type="range"
            value={progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <select
            className={styles.velocity}
            value={speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <button className={styles.muteBtn} onClick={toggleMute}>
            {!isMuted ? (
              <img src={VOLUMEFULL} alt=''></img>
            ) : (
              <img src={VOLUMEMUTE} alt=''></img>
            )}
          </button>
          <button className={styles.screenBtn} onClick={toggleScreen}>
            <img src={FULLSCREEN} alt=''></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;