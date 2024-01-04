import React,{useEffect} from 'react'
import styles from './css/body.module.css'
import { useToken } from './context'
function Body() {
  const {songs} =useToken()
  console.log("body",songs)
  return (
    <div>
        {
          songs.length>0 && 
          <div className={styles['playlist']}>
            <div className={styles['image']}>
                {/* image */}
            </div>
            <div className={styles['details']}>
             {/* <span className={styles['type']}>Playlist</span> */}
             {/* <h1 className={styles['title']}>{songs[0].folder}</h1> */}
            </div>

          </div>
        }
    </div>
  )
}

export default Body