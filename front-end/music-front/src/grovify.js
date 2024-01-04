import React,{useEffect, useState} from 'react'
import Footer from './footer'
import Sidebar from './sidebar'
import Body from './body'
import Navbar from './navbar'
import styles from './css/grovify.module.css'
import SongList from './songList'
import { useToken } from './context'

export default function Grovify(token) {
    const {songs,setCurrFolder,setCurrentSong,currFolder,currentSong}=useToken()
    SongList(token)
    let curr ;
    
    useEffect(()=>{
        curr =songs && songs[0] ? songs[0].audioUrls[0]:null
        if(curr!==null){
            setCurrentSong(curr)
            setCurrFolder(songs[0].folder)
        }
    },[songs])
  return (
    <div className={styles['container']}>
        <div className={styles['grovify_body']}>
            <Sidebar />
            <div className={styles['body']}>
                <Navbar />
                <div className={styles['body_contents']}>
                    <Body />
                    {console.log(currentSong)}
                    
                </div>
            </div>
        </div>
        <div className={styles['footer']}>
            
            {currFolder&&currentSong&&<Footer curr={{folder:currFolder,song:currentSong}}/>}
        </div>
        
    </div>

  )
}