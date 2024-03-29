// SongList.js
import React, { useEffect, useState } from 'react';
import Player from './Player';
import { useToken } from './context';

const SongList = ({token}) => {
  // const [songs, setSongs] = useState([]);
  
  const {songs,setSongsTK,allsongs}=useToken();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        console.log("inisde songlist")
        //console.log("at",token.rt)
        const response = await fetch('https://grovifyec2.nidhiworks.com:443/getAllPlaylistAndSongs',{
            method:"GET",
            mode:'cors',
            headers:{
                Authorization : `Bearer ${token.at}`,
                'Refresh-Token': token.rt,
            },
            
        });
        
        const songUrls = await response.json();
        setSongsTK(songUrls);
        
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  },[]);
  //console.log("Songlist",songs)
};

const AudioPlayer = ({ src }) => {
  return <Player src={src} />;
};

export default SongList;
