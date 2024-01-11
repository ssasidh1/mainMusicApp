import { createContext,useContext,useEffect,useState } from "react";

const TokenContext = createContext()

const TokenProvider = ({children})=>{
    const [accessToken,setAccessToken] = useState(null)
    const [refreshToken,setRefreshToken] = useState(null)
    const[email,setEmail] = useState(null);
    const[username,setUsername]= useState(null);
    const[songs,setSongs]= useState([]);
    const[currentSong,setCurSong] = useState(null)
    const[currFolder,setCurFolder] = useState(null)
    const[sPlaylist,selectPlaylist] = useState(false)
    const setUserEmail = (val)=>{
        setEmail(val);
    }

   
    const selectedPlaylist=(val)=>{
        selectPlaylist(val)
        
    }
    const setAccTk = (val)=>{
        setAccessToken(val)
    }
    const setRefTk = (val)=>{
        setRefreshToken(val);
    }
    const setCurrentSong = (val)=>{
        setCurSong(val)
    }
    const setCurrFolder= (val)=>{
        setCurFolder(val);
    }
    const setSongsTK = (songUrls)=>{
        setSongs((prev)=>{
            const prevSongs = [...prev]
            if(prevSongs.length !==0){
              songUrls.forEach((newsong)=>{
                // need to check
                const id = prevSongs.findIndex((song)=>song.playlistName === newsong.playlistName);
                if(id !== -1){
                  prev[id].audioUrls = newsong.audioUrls
                }
                else{
                  prevSongs.push({
                    playlistName:newsong.playlistName,
                    details:newsong.details,
                    playlistImage:newsong.playlistImage
                  })
                }
              })
              return prevSongs;
            }
            return songUrls
            
          })
    }

    return (
        <TokenContext.Provider value = {{refreshToken,accessToken,
        setAccTk,setRefTk,email,setUserEmail,username,setUsername,songs,setSongsTK,setCurrFolder,
        setCurrentSong,currFolder,currentSong,sPlaylist,selectedPlaylist}}>
            {children}
        </TokenContext.Provider>
    )
}

const useToken = ()=>{
    const context = useContext(TokenContext)
    if(context){
        return context
    }
}

export {TokenProvider,useToken}