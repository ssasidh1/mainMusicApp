import { useToken } from "./context";
import styles from "./css/searchSong.module.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState } from "react";
export default function SearchSongs(){
    const{foundArtist, foundFiles,selectedPlaylist,setCurrFolder,email} = useToken()
    const[playlistName,setPlaylistName] = useState();
    const[songParams,setSongParams] = useState([]);
    const[addedSong,setaddedSong] = useState();
    const[removeSong,setRemoveSong] = useState();
    const[isadd,setadd] = useState([])
    const selPlaylist=(playlist)=>{
        console.log("Inside plays")
        selectedPlaylist(true);
        setCurrFolder(playlist)
    }
    useEffect(() => {
        console.log("add to playlist data", playlistName, addedSong,email);
      
        const addSong = async () => {
          try {
            if (email && playlistName && addedSong) {
             console.log("inside fetch",addedSong,email)
              const response = await fetch('https://grovifyec2.nidhiworks.com:443/insertPlaylist', {
                method: "POST",
                mode: "cors",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email,
                  playlist: playlistName,
                  songs: [addedSong]
                }),
              });
              console.log(response)
              if (response.ok) {
                const data = await response.json();
                console.log("add more ", data);
              } else {
                console.error("Failed to add song to playlist:", response.status);
              }
            }
          } catch (error) {
            console.error("Error while adding song to playlist:", error);
          }
        };
      
        addSong();
      
      }, [addedSong, playlistName,email]);
      
      useEffect(() => {
        console.log("add to playlist data", playlistName, addedSong,email);
      
        const removeSongFromPlaylist = async () => {
          try {
            if (email && playlistName && removeSong) {
             console.log("inside fetch",removeSong,email)
             const removeSongName = removeSong.songName
              const response = await fetch('https://grovifyec2.nidhiworks.com:443/deleteFromPlaylist', {
                method: "DELETE",
                mode: "cors",
                headers: {
                  'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                  email: email,
                  playlist: playlistName,
                  title: removeSongName
                }),
              });
              console.log(response)
              if (response.ok) {
                const data = await response.json();
                console.log("add more ", data);
              } else {
                console.error("Failed to add song to playlist:", response.status);
              }
            }
          } catch (error) {
            console.error("Error while adding song to playlist:", error);
          }
        };
      
        removeSongFromPlaylist();
      
      }, [removeSong, playlistName,email]);
      
   
   
    const addToPlaylist = (item,id)=>{
        console.log("item",item);
        setSongParams((prev)=>[...prev,item]);
        setaddedSong(item)
        let add = isadd
        if(add.length>=id){
            add[id]=!add[id];
            setadd(add)
        }
        else{
            setadd([true])
        }
    }
    const removeSongs = (item,id)=>{
        console.log("item",item);
        
        setRemoveSong(item)
        let add = isadd
        if(add.length>=id){
            add[id]=!add[id];
            setadd(add)
        }
        
    }
        
        // const response = (email && playlistName)? await fetch('https://grovifyec2.nidhiworks.com:443/insertPlaylist',{
        // method:"POST",
        // mode:"cors",
        // headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     email:email,
        //     playlist:playlistName,
        //     songs:songParams

        //   }),
        // }):
        // null;
        // if(response){
        //     //console.log("Show more ",response);
        // }
    
    return(

    <div className={styles['search-found']}>
        {(foundFiles.length>0 || foundArtist.length>0) &&<div>
            <input placeholder="Type PlaylistName" onChange={(e)=>setPlaylistName(e.target.value)}/>
        </div>}
        {foundFiles.length>0&&<div className={styles['list']}>
                {<table>
                    <tbody>
                    <tr>
                        <td>#</td>
                        <td>Title</td>
                    </tr>
                    </tbody>
                </table>}
                <div className={styles['items']}>
                    <table className={styles['table']}>
                    <tbody className={styles['tbody']}>
                    <tr className={styles['ol-items']}>
                        {/* {console.log("found files",foundFiles)} */}
                        {foundFiles&&foundFiles.map((item,ind)=>{
                            return(
                            <td key = {ind} className={styles['li-items']} >
                                <div className={styles['song-fields']}>
                                <div className={styles['li-items']}  >
                                <div className={styles['index']}>{ind+1}.</div>
                                <div className={styles['song-details']}>
                                    <div className={styles['songName']}> {item.songName} </div> 
                                    <div className={styles['artist']}> {item.artist} </div> 
                                </div>
                                </div>
                                {isadd.length===0||!isadd[ind]?
                                <div className={styles['add-icons']}><AddCircleIcon onClick={()=>addToPlaylist(item,ind)}/></div>
                                :<div className={styles['add-icons']}><RemoveCircleOutlineIcon onClick={()=>removeSongs(item,ind)} /></div>
                                }
                                </div>
                                <div className={styles['timing-likes']}>
                                </div>
                                
                            </td>
                        )})
                        }
                    </tr>
                    </tbody>
                    </table>
                </div>
            </div>}
            {foundArtist.length>0 && <div className={styles['searchedPlaylist']}>
            {foundArtist && foundArtist.map((folder,i)=>{
                // {console.log("inisdde artist",foundArtist)}
            return(
            <div key={i}className={styles['playlist']} onClick={()=>selPlaylist(folder)}>
            <div className={styles['card']}>
              <div className={styles['image']}>
              <img className={styles['playlist-logo']} src={folder.playlistImage}/>
              </div>
            </div>
            <div className={styles['details']}>
                <span className={styles['playlist-name']}>{folder.playlistName}</span>
                <span className={styles['artist']}>{folder.artist}</span>
              </div>
          </div>
          )})}
            </div> } 
            </div>          
      
    )
}