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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Slider,Typography} from '@mui/material';
import { useToken } from './context';
function Player({src}) {
    const audioRef= useRef()
    const [isPlaying,setIsPlaying] = useState(false)
    const [isFav, setIsFav] = useState(false)
    const [volume,setVolume] = useState(30)
    const [mute, setMute] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showMoreOpt,setShowMoreOpt] = useState(false)
    let folder,songName,time,artist,file;
    const {email,setCurrentSong,currentSong} = useToken();
    
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
    const x = async()=>
    {
        if(currentSong)
        {
            const audioUrl = currentSong.audio;
            const rex = await getAudioDuration(audioUrl);
            console.log("durrr",rex,audioUrl)
        }
    }
    x();
  },[currentSong])
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
        // if(currentSong && duration){
        //     console.log(currentSong)
        //     const res = currentSong.split('/')
        //     const path = res[res.length-1]
        //     //console.log(path)
        //     const foldersong = path.split('%2F')
        //     folder = foldersong[0];
        //     songName = foldersong[1].split('.mp3')[0]
        //     file = foldersong[1]
        //     artist=foldersong[0]
        //     time=duration
        // }
        if(isFav){
            console.log(isFav)
            const r = async()=>{await showmoreClick()}
            console.log("r",r)
            r();
        }
        setCurrentSong(src);
        
    },[isFav,volume,isPlaying])
   

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
            : volume < 20 ? <VolumeOffIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
            : volume <= 20 ? <VolumeMuteIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
            : volume <= 75 ? <VolumeDownIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
            : <VolumeUpIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
    }
    const audioContext = new (window.AudioContext)();

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
    console.log('Audio Duration:', durationInSeconds);
    setDuration(durationInSeconds); // Set duration using state
    return durationInSeconds;
  } catch (error) {
    console.error('Error fetching audio duration:', error);
  }
}

const showmoreClick = async()=>{
    //console.log("called")
    if(folder && songName && file && artist && time){
        // must add playlist name, custom given by user
        const folderName = isFav ? "LikedSongs":folder
        //console.log("foldername",email)
        const songParams = {folder:folderName,songName:songName,file:file,artist:artist,duration:time}
        const response = email ? await fetch('https://grovifyec2.nidhiworks.com:443/insertPlaylist',{
        method:"POST",
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:email,
            playlist:folderName,
            songs:[songParams]

          }),
        }):
        null;
        if(response){
            //console.log("Show more ",response);
        }
    }
    
}

// Example usage:


  return (
    <>
    { src && <div className={style['div-bg']}>
       <audio src= {src.audio} ref ={audioRef} muted={mute}/>
        <div className={style['audio-div']}>
            <div className={style['box-div']}>
                
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
                
                </div>
                <div className={style['options']}>
                <div className={style['stack-div']}>
                    {/* <VolumeDownIcon sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}}/> */}
                    <VolumeBtns/>
                    <Slider sx= {{color:'silver',width:'5rem',height:2,'&:hover':{color:'white',cursor:'auto'},
                    '& .MuiSlider-thumb':{width:'13px',height:'13px'},min:0,max:1, value:{volume}}}
                     onChange={(e,v)=>{setVolume(v)}}/>
                </div>
                <div className={style['stack4-div']}>
                    {!isFav ? <FavoriteBorderIcon sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}} onClick={handleFav}/>
                    :<FavoriteIcon sx= {{color:'white','&:hover':{color:'silver'},cursor:'pointer'}} onClick={()=>{setIsFav(prev=>!prev)}}/>
                    }
                    <MoreVertIcon sx= {{color:'silver','&:hover':{color:'white'},cursor:'pointer'}} onClick= {()=>setShowMoreOpt((prev)=>!prev)}/>
                    {showMoreOpt&&<div className={style['showmore']}>
                        <button onClick={showmoreClick}>add playlist</button>
                    </div>}
                </div> 
                </div>
            </div>
            <div className={style['stack3-div']}>
                    <Typography sx={{color:'silver'}}>{formatTime(elapsed)}</Typography>
                    <Slider value={elapsed ===0? 0: ((100/duration)*elapsed)} sx= {{color:'silver',height:2,'&:hover':{color:'white',cursor:'auto'},
                    '& .MuiSlider-thumb':{display: 'none',}, '& .MuiSlider-rail':{width:'100% !important'}
                     ,max :{duration}}} 
                    />
                    {/* {console.log('elapsed',elapsed, duration)} */}
                    <Typography sx={{color:'silver'}}>{formatTime(duration - elapsed)}</Typography>
            </div>
            
        </div>
    </div>}
    </>
  )
}

export default Player