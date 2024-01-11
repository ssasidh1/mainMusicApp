import React,{useEffect, useState} from 'react'
import Footer from './footer'
import Sidebar from './sidebar'
import Navbar from './navbar'
import styles from './css/grovify.module.css'
import SongList from './songList'
import { useToken } from './context'
import BodyC from './bodyConnector'

export default function Grovify(token) {
    const {songs,setCurrFolder,setCurrentSong,currentSong}=useToken()
    SongList(token)
    let curr ;
    
    useEffect(()=>{
        curr =songs && songs[0] ? songs[0].details[0].audio:null
        if(curr!==null){
            setCurrentSong(songs[0].details[0])
            setCurrFolder(songs[0])
        }
    },[songs])
  return (
    <div className={styles['container']}>
        <div className={styles['grovify_body']}>
            <Sidebar />
            <div className={styles['body']}>
                <Navbar />
                <div className={styles['body_contents']}>
                    <BodyC />
                    
                    
                </div>
            </div>
        </div>
        <div className={styles['footer']}>
            <Footer/>
            
        </div>
        
    </div>

  )
}