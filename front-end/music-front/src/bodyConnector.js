import Body from "./body"
import { useToken } from './context'
import styles from './css/bodyConnector.module.css'
export default function BodyC({isSelected}){
    const {songs} =useToken()
    return(
    <div className={styles['playlist-cards']} >
        {!isSelected && songs.map((val,ind)=>{
            
                return(
                    <div key={ind}>
                        <Body playlist ={val.folder}  url={val.audioUrls} />
                    </div>
                )
                
            })
        }
    </div>
    

)}