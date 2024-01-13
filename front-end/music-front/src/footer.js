import React from 'react'
import styles from './css/footer.module.css'
import Player from './Player'
import { useToken } from './context'
export default function Footer() {
 
  const {currFolder,currentSong} = useToken()
  //console.log("foot",currFolder,currentSong)
  return (
    <div className={styles['footer']}>
      <div className={styles['footer-props']}>
                {currFolder &&<div className={styles['folder']}>
                  <img className={styles['playlist-logo']} src ={currentSong.playlistImage}/>
                  <div className={styles['details']}>
                    <div className={styles['currSong']}>{currentSong.songName}</div>
                    <div className={styles['artist']}>{currentSong.artist}</div>
                  </div>
                  </div>}
                {currentSong &&<div className={styles['song']}><Player src ={currentSong}/></div>}
      </div>
    </div>
  )
}