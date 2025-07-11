import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => {
      setPlayStatus(true);
    }).catch(err => console.error("Play error:", err));
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = (id) => {
    setTrack(songsData[id]);
    setTimeout(() => {
      play();
    }, 100);
  };

  const previous = () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);
      setTimeout(play, 200);
    }
  };

  const next = () => {
    if (track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]);
      setTimeout(play, 200);
    }
  };

  const seekSong = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const width = seekBg.current.offsetWidth;
    const duration = audioRef.current.duration;
    if (duration) {
      audioRef.current.currentTime = (clickX / width) * duration;
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 0;
      if (seekBar.current) {
        seekBar.current.style.width = `${(current / duration) * 100}%`;
      }
      setTime({
        currentTime: {
          second: Math.floor(current % 60),
          minute: Math.floor(current / 60),
        },
        totalTime: {
          second: Math.floor(duration % 60),
          minute: Math.floor(duration / 60),
        },
      });
    };
    if (audioRef.current) {
      audioRef.current.ontimeupdate = handleTimeUpdate;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
      }
    };
  }, [track]);

  return (
    <PlayerContext.Provider value={{
      audioRef,
      seekBg,
      seekBar,
      track,
      setTrack,
      playStatus,
      time,
      play,
      pause,
      playWithId,
      previous,
      next,
      seekSong,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
