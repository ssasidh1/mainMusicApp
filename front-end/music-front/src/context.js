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
    const[selectedSong,setSelectedSong] = useState(false)
    const[autoplaySongs, setAutoPlaySongs] = useState();
    const [isautoPlay,setAutoPlay] = useState(false)
    const [showap,setShowap] = useState(false);
    const [issearched,setSearched]=useState(false);
    const [foundFiles,setFiles] = useState()
    const [foundArtist,setArtist] = useState()


    const setFilesFn = (val)=>{
        console.log("context files",val)
        setFiles(val);
    }

    const setArtistFn = (val)=>{
        console.log("context artist",val)
        setArtist(val);
    }

    const setSearchedFn = (val)=>{
        setSearched(val)
    }
   
    const setUserEmail = (val)=>{
        setEmail(val);
    }
    const setSongSelectedFn= (val)=>{
        setSelectedSong(val);
    }
    
    const setAutoPlayFn = (val)=>{
        setAutoPlay(val);
    }
    const setAutoPlaySongsFn = (val)=>{
        setAutoPlaySongs(val);
    }
    const setUserName = (val)=>{
        setUsername(val);
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
        setAccTk,setRefTk,email,setUserEmail,username,setUserName,songs,setSongsTK,setCurrFolder,
        setCurrentSong,currFolder,currentSong,sPlaylist,selectedPlaylist,setSongSelectedFn,selectedSong
        ,setAutoPlaySongsFn,autoplaySongs,setAutoPlayFn,isautoPlay,showap,setShowap,setSearchedFn,issearched
        ,setArtistFn,foundArtist,setFilesFn,foundFiles}}>
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