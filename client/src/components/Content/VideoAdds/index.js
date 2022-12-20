import React, { useRef, useContext } from 'react';

import assets from '../../../assets';
import useVideoPlayer from '../../../hooks/useVideoPlayer';
import Context from '../../../Context'

import styles from './styles.module.scss';

function VideoAdds() {
  const { state } = useContext(Context);
  const { lang } = state;
  const { ICONS, VIDEO } = assets;
  const { PLAY, PAUSE, VOLUMEFULL, VOLUMEMUTE } = ICONS;
  const { ENLETYSHOPS, RULETYSHOPS, UALETYSHOPS } = VIDEO;
  const videoElement = useRef(null);
  const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
  const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoElement);
  const { progress, isPlaying, speed, isMuted } = playerState;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <video
          src={
            langRu ? RULETYSHOPS : 
            langUa ? UALETYSHOPS :
            ENLETYSHOPS
          }
          autoPlay
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
        />
        <div className={styles.controls}>
          <div className={styles.actions}>
            <button onClick={togglePlay}>
              {!isPlaying ? (
                
                <img src={PLAY} className={`${styles.bx} ${styles.bxPlay}`} alt=''></img>
              ) : (
                <img src={PAUSE} className={`${styles.bx} ${styles.bxPause}`} alt=''></img>
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
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
              <img src={VOLUMEFULL} className={`${styles.bx} ${styles.bxsVolumeFull}`} alt=''></img>
            ) : (
              <img src={VOLUMEMUTE} className={`${styles.bx} ${styles.bxsVolumeMute}`} alt=''></img>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoAdds;