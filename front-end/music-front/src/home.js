import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenProvider,useToken } from './context'
// import SongList from './songList';
import Grovify from './grovify';
function Home() {
    const {refreshToken,accessToken,setAccTk,setRefTk} = useToken();
    const nav = useNavigate();
    const {email} = useToken()
    const playlistname = useRef();
    useEffect(()=>{
        //console.log("l",localStorage.getItem('accessToken'))
        if(accessToken === null || refreshToken=== null){
            setAccTk(localStorage.getItem('accessToken'))
            setRefTk(localStorage.getItem('refreshToken'))
        }
        
    },[refreshToken,accessToken])
    const getPlaylistSongs = async()=>{
      //console.log(playlistname.current.value)
      if(playlistname){
        const resp = await fetch("http://ec2-54-237-118-91.compute-1.amazonaws.com:3005/userPlaylist",{
        method:"POST",
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify({
          folder:playlistname.current.value
        })
      }) 
      const result =await resp.json();
      //console.log("pla",result)
    }
    }
  return (
    <div>
      {/* {accessToken && <SongList token={{at:accessToken, rt:refreshToken}}/>}
      <label>Playlist name</label>
      <input type = "text" ref = {playlistname}/>
      <button onClick={getPlaylistSongs}>clickme</button> */}
      <Grovify token={{at:accessToken, rt:refreshToken}}/>
     
    </div>
  )
}

export default Home