import React, { useEffect, useRef } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Set the source dynamically when the component mounts
    audioRef.current.src = 'https://ec2-54-237-118-91.compute-1.amazonaws.com:3005/playlist';
  }, []);

  return (
    <div>
      <h2>Audio Player</h2>
      <audio controls ref={audioRef}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
