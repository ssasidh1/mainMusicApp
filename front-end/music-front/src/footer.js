import React from 'react'
import styles from './css/footer.module.css'
import Player from './Player'
import {randomColor} from './sidebar'
import { useToken } from './context'
export default function Footer({curr}) {
  const currFolder = curr.folder
  const currentSong = curr.song
  const {setColour} = useToken()
  // setColour(randomColor());
  const c = randomColor()
  // setColour(c)
  console.log("r",c)
  return (
    <div className={styles['footer']}>
      <div className={styles['footer-props']}>
      
                {currFolder &&<div className={styles['folder']}>
                <div className={styles['playlist-logo']} style={{ backgroundColor: `#${c.b}`,color:`#${c.i}`}}>
                            {currFolder.charAt(0).toUpperCase()}
                        </div>
                  <div className={styles['currFolder']}>{currFolder}</div>
                  </div>}
                {currentSong &&<div className={styles['song']}><Player src ={currentSong}/></div>}
      </div>
    </div>
  )
}