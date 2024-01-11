import React, { useState } from 'react'
import styles from './css/sidebar.module.css'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useToken } from './context';
// export var randomColor = ()=> {
//     const baseColor = Math.floor(Math.random()*16777215).toString(16);
//     const invertColor = (0xffffff ^ parseInt(baseColor, 16)).toString(16).padStart(6, '0');
//     const newColors = { b: baseColor, i: invertColor };

//     return newColors;
// }
export default function Sidebar() {
    const {songs,setCurrFolder,selectedPlaylist} = useToken()
    const handleSideBarSelection = (song)=>{
        setCurrFolder(song);
        selectedPlaylist(true);
    }
    
   
  return (
    <div className={styles['container']}>
        <div className={styles['sidebar-links']}>
            <div className='links'>
                <img className = {styles['logo']} src = "Grovify.png" alt="logo"/>
            </div>
            <ul className={styles['ulist']}>
                <li>
                    <HomeIcon />
                    <span>Home</span>
                </li>
                <li>
                    <SearchIcon />
                    <span>Search</span>
                </li>
                
            </ul>
        </div>
        <div className={styles['playlists']}>
            <div className={styles['library']}>
            <LibraryMusicIcon/>
            <span>Your Library</span>
            </div>
            <div className={styles['details']}>
            {
                
                songs.length>0 && songs.details !==null && songs.map((song,index)=>{
                    
                    return(
                    <li key={index} className={styles['li-playlist']}onClick={()=>{handleSideBarSelection(song)}}>
                        <img className={styles['playlist-logo']} src={song.playlistImage}/>
                        <div className={styles['playlist-info']}>
                            <div className={styles['playlist-name']}>{song.playlistName}</div>
                            <div className={styles['playlist-artist']}>{song.details[0].artist}</div>
                        </div>
                        
                    </li>
                )})
            }
        </div>
        </div>
    </div>
    
  )
}
