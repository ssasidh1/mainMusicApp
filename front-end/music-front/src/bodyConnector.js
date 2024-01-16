import { useEffect } from "react";
import Body from "./body"
import { useToken } from './context'
import styles from './css/bodyConnector.module.css'
import SearchSongs from './searchSongs';
export default function BodyC(){
    const {songs,sPlaylist,currFolder,issearched} =useToken()
        const list = songs.reduce((acc1,val)=>{
        return acc1.concat(val.details.reduce((acc,song)=>{
            //console.log("val",song)
            song['playlistName'] =val.playlistName;
            song['playlistImage'] = val.playlistImage
            return acc.concat(song)
        },[]))
    },[])
useEffect(()=>{ 
    console.log("spl",sPlaylist)

},[sPlaylist])
    //console.log("list",songs[0])
    return(
    <div  >
        {!issearched ?(!sPlaylist?(<div className={styles['playlist-cards']}>
                        {songs.map((song,id)=>{
                            //console.log("entries",song)
                            return(<div key={id}> <Body  playlist={song} /></div>)
                        }
                        )}
                        
                    </div>)
                    :
                    (<Body playlist={songs[0]}/>))
                
        :(<SearchSongs />)}
    </div>
    

)}