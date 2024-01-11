import React, { useEffect, useState } from "react"
import { useToken } from './context';
import styles from './css/body.module.css'
export function BodyMain({playlist}){
    const {selectedPlaylist,setCurrFolder} = useToken();
    const selPlaylist=()=>{
        console.log("Inside plays")
        selectedPlaylist(true);
        setCurrFolder(playlist)
    }

    return(
        <div className={styles['playlist']} onClick={selPlaylist}>
            <div className={styles['card']}>
              <div className={styles['image']}>
              <img className={styles['playlist-logo']} src={playlist.playlistImage}/>
              </div>
            </div>
            <div className={styles['details']}>
                <span className={styles['playlist-name']}>{playlist.playlistName}</span>
                <span className={styles['artist']}>{playlist.details[0].artist}</span>
              </div>
          </div>
    )
}