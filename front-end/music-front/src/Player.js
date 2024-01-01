import React,{useState,useRef, useEffect} from 'react'
import style from './css/Player.module.css'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Slider,Typography} from '@mui/material';
function Player({src}) {
    const audioRef= useRef()
    const [currentSong] = useState(src)
    const [isPlaying,setIsPlaying] = useState(false)
    const [isFav, setIsFav] = useState(false)
    const [volume,setVolume] = useState(30)
    const [mute, setMute] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = ()=>{
        if(!isPlaying){
            audioRef.current.play()
        }
        else{
            audioRef.current.pause()
        }
        setIsPlaying(prev=>!prev)
    }
    useEffect(()=>{
        if(audioRef && audioRef.current){
            audioRef.current.volume = volume/100
        }
        if(isPlaying){
            //console.log(audioRef?.current?.duration)
            const interval = setInterval(() => {
                //const _duration = Math.floor(audioRef?.current?.duration);
                const _elapsed = Math.floor(audioRef?.current?.currentTime);
                
                // setDuration(_duration);
                setElapsed(_elapsed);
            }, 100);
            return () => clearInterval(interval);
        }
    },[volume,isPlaying])
    useEffect(()=>{
        if(isFav){
            console.log(currentSong)
            const res = currentSong.split('/')
            const path = res[res.length-1]
            //console.log(path)
            const foldersong = path.split('%2F')
            const folder = foldersong[0];
            const song = foldersong[1]
            //console.log(folder,song)
        }
    },[isFav])
    useEffect(()=>{
        if(currentSong)
        {const audioUrl = currentSong;
        getAudioDuration(audioUrl);}
    },[currentSong])

    function formatTime(time) {
        if(time && !isNaN(time)){
            const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
            const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

            return `${minutes}:${seconds}`;
        }
        return '00:00';
    }

    const handleFav = ()=>{
        setIsFav(prev=>!prev)
    }
    function VolumeBtns(){
        return mute
            ? <VolumeOffIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
            : volume <= 20 ? <VolumeMuteIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
            : volume <= 75 ? <VolumeDownIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
            : <VolumeUpIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
    }
    const audioContext = new (window.AudioContext || window.AudioContext)();

async function fetchAudioBuffer(audioUrl) {
  const response = await fetch(audioUrl);
  const arrayBuffer = await response.arrayBuffer();
  //console.log("Buff",response)
  return await audioContext.decodeAudioData(arrayBuffer);
}

async function getAudioDuration(audioUrl) {
  try {
    const audioBuffer = await fetchAudioBuffer(audioUrl);
    const durationInSeconds = audioBuffer.duration;
    //console.log(audioBuffer)
    //console.log('Audio Duration:', durationInSeconds, audioUrl);
    setDuration(durationInSeconds); // Set duration using state
    return durationInSeconds;
  } catch (error) {
    console.error('Error fetching audio duration:', error);
  }
}

// Example usage:


  return (
    <>
    { src && <div className={style['div-bg']}>
       <audio src= {src} ref ={audioRef} muted={mute}/>
        <div className={style['audio-div']}>
            <div className={style['box-div']}>
                <div className={style['stack-div']}>
                    {/* <VolumeDownIcon sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}}/> */}
                    <VolumeBtns/>
                    <Slider sx= {{color:'silver',height:2,'&:hover':{color:'white',cursor:'auto'},
                    '& .MuiSlider-thumb':{width:'13px',height:'13px'},min:0,max:1, value:{volume}}}
                     onChange={(e,v)=>{setVolume(v)}}/>
                </div>
                <div className={style['stack2-div']}>
                    <SkipPreviousIcon sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}}/>
                    <FastRewindIcon sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}}/>
                    {!isPlaying ?
                    <PlayArrowIcon fontSize='large' sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}}
                    onClick={togglePlay}
                    />
                    :<PauseIcon fontSize='large' sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}}
                    onClick={togglePlay}
                    />}
                    <FastForwardIcon sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}}/>
                    <SkipNextIcon sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}}/>
                    {!isFav ? <FavoriteBorderIcon sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}} onClick={handleFav}/>
                    :<FavoriteIcon sx= {{color:'white','&:hover':{color:'silver'},cursor:'pointer'}} onClick={()=>{setIsFav(prev=>!prev)}}/>
                    }
                </div>
                
            </div>
            <div className={style['stack3-div']}>
                    <Typography sx={{color:'silver'}}>{formatTime(elapsed)}</Typography>
                    <Slider  sx= {{color:'silver',width:"400px",height:2,'&:hover':{color:'white',cursor:'auto'},
                    '& .MuiSlider-thumb':{width:'13px',height:'13px',display: 'none',} ,value:{elapsed} ,max :{duration}} }
                    />
                    <Typography sx={{color:'silver'}}>{formatTime(duration - elapsed)}</Typography>
            </div>
        </div>
    </div>}
    </>
  )
}

export default Player