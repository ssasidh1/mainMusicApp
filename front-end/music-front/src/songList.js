// SongList.js
import React, { useEffect, useState } from 'react';
import Player from './Player';

const SongList = ({token}) => {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        //console.log("at",token.rt)
        const response = await fetch('http://localhost:3005/playlistz',{
            method:"GET",
            headers:{
                Authorization : `Bearer ${token.at}`,
                'Refresh-Token': token.rt,
            },
            
        });
        const songUrls = await response.json();
        console.log("res",songUrls)
        setSongs((prev)=>{
          const prevSongs = [...prev]
          console.log(prev)
          if(prevSongs.length !==0){
            songUrls.forEach((newsong)=>{
              const id = prevSongs.findIndex((song)=>song.folder === newsong.folder);
              if(id !== -1){
                prev[id].audioUrls = newsong.audioUrls
              }
              else{
                prev.push({
                  folder:newsong.folder,
                  audioUrls:newsong.audioUrls
                })
              }
            })
            return prevSongs;
          }
          return songUrls
          
        })
        // setSongs((prev)=>[
        //   ...prev,
        //   ...songUrls.map((song)=>({
        //     folder:song.folder,
        //     audioUrls:song.audioUrls
        //   }))
        // ])
        // for(let songs of songUrls){
        //     console.log(songs.audioUrls)
        //     setSongs((prev)=>{
        //       ...prev,
        //       ...songUrls
        //     }
        //     )
        // }
        //console.log(songs)
        
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  },[]);

  return (
    <div>
    <h2>Song List</h2>
    <ul>
      {songs.folder!==null && songs.map((song, index) => (
        <li key={index}>
          <h3>{song.folder}</h3>
          <ul>
            {song && song.audioUrls.map((audioUrl, id) => (
              <li key={id}>
                {<AudioPlayer src={audioUrl} />}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    <Player/>
  </div>
  );
};

const AudioPlayer = ({ src }) => {
  return <Player src={src} />;
};

export default SongList;
