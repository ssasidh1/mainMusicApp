import React, { useEffect, useRef } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Set the source dynamically when the component mounts
    audioRef.current.src = 'https://grovifyec2.nidhiworks.com:443/playlist';
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
