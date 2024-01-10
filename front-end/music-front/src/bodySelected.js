import styles from './css/bodySelected.module.css'
import { useToken } from './context'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export function BodySelected(){
    const {currFolder,setCurrentSong} = useToken()
    console.log("selectred playlist",currFolder)
    const handleSelectSong= (item)=>{
        console.log("e",item)
        setCurrentSong(item.audio)
    }
    return(
        <div className={styles['mainlist']}>
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
            <div className={styles['list']}>
                <div className={styles['options']}>
                <PlayCircleIcon sx={{color:'rgb(149, 220, 216)', fontSize:"3.5rem"}}/>
                <FavoriteBorderIcon sx={{color:'silver', fontSize:"2rem"}}/>
                <MoreHorizIcon sx={{color:'silver', fontSize:"2rem"}}/>
                </div>
                    <tr>
                        <td>#</td>
                        <td>Title</td>
                    </tr>
                <div className={styles['items']}>
                    
                    <tr className={styles['ol-items']}>
                        {currFolder.details.map((item,ind)=>{
                            return(
                            <td key = {ind} className={styles['li-items']} onClick={()=>handleSelectSong(item)}>
                                <div className={styles['index']}>{ind+1}.</div>
                                <div className={styles['song-details']}>
                                    <div className={styles['songName']}> {item.songName} </div> 
                                    <div className={styles['artist']}> {item.artist} </div> 
                                </div>
                                <div className={styles['timing-likes']}>
                                </div>
                                
                            </td>
                        )})
                        }
                    </tr>
                </div>
            </div>
          </div>
        }
    </div>
    )
}