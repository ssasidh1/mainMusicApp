import { useState,createContext,useContext } from "react";

    const PlayerContext = createContext();
    const PlayerProvider = ({children})=>{
    const [isPlaying,setIsPlaying] = useState(false)
    const [isFav, setIsFav] = useState(false)
    const [volume,setVolume] = useState(30)
    const [mute, setMute] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showMoreOpt,setShowMoreOpt] = useState(false)
    
    const setPlaying = ()=>{
        setIsPlaying(prev=>!prev)
    }

    const setMuteFn = (val)=>{
        setMute(val);
    }
    const setIsFavFn = ()=>{
        setIsFav(prev=>!prev)
    }

    const setVolumeFn = (val)=>{
        setVolume(val)
    }
    return(
        <PlayerContext.Provider value={{setPlaying,isPlaying,mute,setMuteFn,isFav,setIsFavFn,volume}}>
            {children}
        </PlayerContext.Provider>
    )
    

}

const usePlayerApi = ()=>{
    const context = useContext(PlayerContext)
    if(context)
    return context
}

export {usePlayerApi, PlayerProvider}