import React from 'react'
import styles from './css/footer.module.css'
import Player from './Player'
import { useToken } from './context'
export default function Footer() {
 
  const {currFolder,currentSong} = useToken()
  
  return (
    <div className={styles['footer']}>
      <div className={styles['footer-props']}>
                {currFolder &&<div className={styles['folder']}>
                  <img className={styles['playlist-logo']} src ={currFolder.playlistImage}/>
                  <div className={styles['currFolder']}>{currFolder.playlistName}</div>
                  </div>}
                {currentSong &&<div className={styles['song']}>{console.log("Inside footer",currentSong)}<Player src ={currentSong}/></div>}
      </div>
    </div>
  )
}