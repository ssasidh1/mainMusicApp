import React,{useEffect} from 'react'
import styles from './css/body.module.css'
function Body({playlist,url}) {
 
  return (
    <div >
        {
          <div className={styles['playlist']}>
            <div className={styles['card']}>
              <div className={styles['image']}>
                  <div className={styles['folder-circle']}>
                        {playlist}
                    </div>
              </div>
            </div>
            <div className={styles['details']}>
                <span className={styles['playlist-name']}>{playlist}</span>
                <span className={styles['artist']}>{url[0].artist}</span>
              </div>
          </div>
        }
    </div>
  )
}

export default Body