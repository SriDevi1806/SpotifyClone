import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets';

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    previous,
    next,
    seekSong,
    time,
  } = useContext(PlayerContext);

  const formatTime = (min, sec) => `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      {/* Track Info */}
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt='track' />
        <div>
          <p>{track.name}</p>
          <p>{track.desc}</p>
        </div>
      </div>

      {/* Controls */}
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <img className='w-4' src={assets.shuffle_icon} alt='shuffle' />
          <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt='prev' />
          {playStatus ? (
            <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt='pause' />
          ) : (
            <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt='play' />
          )}
          <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt='next' />
          <img className='w-4' src={assets.loop_icon} alt='loop' />
        </div>

        {/* Seekbar */}
        <div className='flex items-center gap-5 w-full'>
          <p>{formatTime(time.currentTime.minute, time.currentTime.second)}</p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer h-1 relative'
          >
            <div
              ref={seekBar}
              className='absolute top-0 left-0 h-1 bg-green-500 rounded-full'
              style={{ width: '0%' }}
            ></div>
          </div>
          <p>{formatTime(time.totalTime.minute, time.totalTime.second)}</p>
        </div>
      </div>

      {/* Volume/Extras (optional) */}
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img className='w-4' src={assets.volume_icon} alt='volume' />
      </div>
    </div>
  );
};

export default Player;
