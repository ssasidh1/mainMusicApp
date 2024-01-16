import React, { useEffect, useState } from 'react'
import styles from './css/navbar.module.css'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useToken } from './context';
function Navbar() {
  const{username,songs,setSearchedFn,setArtistFn,setFilesFn,selectedPlaylist} = useToken()
  const[ip,setip] = useState("");
  //console.log("username",songs)
  useEffect(()=>{const findItem = ()=>{
    
    let found = [];
    let foundArtist = [];
    if(ip.length ===0){
      selectedPlaylist(false)
      setSearchedFn(false);
      console.log("empty")
    }
    //console.log("inside",ip)
    if(songs && ip.length !==0){
       songs.map((song,id)=>{
          song.details.forEach((element,i) => {
            //console.log("in",songs[id].details[i]['artist'])
            if(songs[id].details[i]['songName'].toString().toLowerCase().includes(ip) ){
              //console.log("artist",songs[id].details[i]['songName'])
              found.push(songs[id].details[i])
            }
            if(songs[id].details[i]['artist'].toString().toLowerCase().includes(ip) ){
              //console.log("artist",songs[id].details[i]['songName'])
              if(!foundArtist.some((playlist)=>playlist.playlistName === songs[id].playlistName)){
                foundArtist.push(songs[id])
              }
              
            }
          });
          
        
      })
    }
    setFilesFn(found);
    setArtistFn(foundArtist);
    if(found.length >0 || foundArtist.length >0){setSearchedFn(true);}
    
  }
  findItem();
},[ip])
  const handleClose = ()=>{
    setSearchedFn(false);
    setip("");
    setArtistFn(null);
    setFilesFn(null);
  }
 
  return (
    <div className={styles['container']}>
        <div className={styles['search']}>
            <SearchIcon sx={{color:'silver'}}/>
            <input className={styles['search-ip']} type = 'text' placeholder='Artists, songs or podcasts' value={ip} onChange={(e)=>{setip(e.target.value)}}/>
            {ip.length!==0&&<CloseIcon sx={{color:'white'}} onClick={handleClose}/>}
        </div>
        <div className={styles['avatar']}>
            <a href='#'>
                <AccountCircleIcon sx={{color: 'silver', '&:hover': {color: 'white'}}}/>
                <span>{username}</span>
            </a>
        </div>
    </div>
  )
}

export default Navbar