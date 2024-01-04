import { createContext,useContext,useState } from "react";

const TokenContext = createContext()

const TokenProvider = ({children})=>{
    const [accessToken,setAccessToken] = useState(null)
    const [refreshToken,setRefreshToken] = useState(null)
    const[email,setEmail] = useState(null);
    const[username,setUsername]= useState(null);
    const[songs,setSongs]= useState([]);
    const[currentSong,setCurSong] = useState(null)
    const[currFolder,setCurFolder] = useState(null)
    const[colors,setColors] = useState(null)
    const setUserEmail = (val)=>{
        setEmail(val);
    }
    const setColour=(val)=>{
        setColors(val)
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
            console.log(prev)
            if(prevSongs.length !==0){
              songUrls.forEach((newsong)=>{
                const id = prevSongs.findIndex((song)=>song.folder === newsong.folder);
                if(id !== -1){
                  prev[id].audioUrls = newsong.audioUrls
                }
                else{
                  prev.push({
                    folder:newsong.folder,
                    audioUrls:newsong.audioUrls
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
        setCurrentSong,currFolder,currentSong,colors,setColour}}>
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