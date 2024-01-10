import styles from './css/bodySelected.module.css'
import { useToken } from './context'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
export function BodySelected(){
    const {currFolder} = useToken()
    console.log("selectred playlist",currFolder)
    return(
        <div>
        {
            currFolder &&<div className={styles['selected-playlist']}>
            <div className={styles['playlist-details']}>
              <img src = {currFolder.playlistImage} className={styles['playlist-img']}/>
              <div className={styles['playlist-highlights']}> 
              <div className={styles['playlistName']}>{currFolder.playlistName}</div>
              <div className={styles['extra']}>
                <div className={styles['playlistArtist']}>{currFolder.details[0].artist}</div>
                <FiberManualRecordIcon sx={{color:'white', width:'8px'}}/>
                <div className={styles['noOfsongs']}>{currFolder.details.length} songs</div>
              </div>
              </div>
            </div>
            <div>
                
            </div>
          </div>
        }
    </div>
    )
}