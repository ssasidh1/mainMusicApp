// import { usePlayerApi } from "./playerContext"
// import { useToken } from './context';
// import { useEffect } from "react";
// import React from "react";
// import VolumeDownIcon from '@mui/icons-material/VolumeDown'
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
// const {setPlaying,isPlaying,mute,setMutefn,isFav,setIsFavFn,volume,setVolumeFn} = usePlayerApi();

// let folder,songName,time,artist,file,email;
// export function PlayerApi(){
//      const togglePlay = (audioRef)=>{
//         console.log("togglePlay",isPlaying)
//         if(!isPlaying){
//             audioRef.current.play()
//         }
//         else{
//             audioRef.current.pause()
//         }
//         setPlaying(prev=>!prev)
//     }
    
//     const playSequentially = ()=>{
//         audioRef.current.currentTime = 0;
//         audioRef.current.play()
//         setPlaying(true)
//     }
    
       
    
//      function formatTime(time) {
//         if(time && !isNaN(time)){
//             const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
//             const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);
    
//             return `${minutes}:${seconds}`;
//         }
//         return '00:00';
//     }
    
//      const handleFav = ()=>{
//         setIsFavFn()
//         }
//      function VolumeBtns(){
//             return mute
//                 ? <VolumeOffIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMutefn(!mute)} />
//                 : volume < 20 ? <VolumeOffIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMutefn(!mute)} />
//                 : volume <= 20 ? <VolumeMuteIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMutefn(!mute)} />
//                 : volume <= 75 ? <VolumeDownIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMutefn(!mute)} />
//                 : <VolumeUpIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={() => setMutefn(!mute)} />
//         }
    
//         const audioContext = new (window.AudioContext)();
//      async function fetchAudioBuffer(audioUrl) {
//       const response = await fetch(audioUrl);
//       const arrayBuffer = await response.arrayBuffer();
//       //console.log("Buff",response)
//       return await audioContext.decodeAudioData(arrayBuffer);
//     }
    
//      async function getAudioDuration(audioUrl) {
//       try {
//         const audioBuffer = await fetchAudioBuffer(audioUrl);
//         const durationInSeconds = audioBuffer.duration;
//         //console.log(audioBuffer)
//         console.log('Audio Duration:', durationInSeconds);
//         setDuration(durationInSeconds); // Set duration using state
//         return durationInSeconds;
//       } catch (error) {
//         console.error('Error fetching audio duration:', error);
//         return -1;
       
//       }
//     }
//      const handleVolume = (val)=>
//     {
//     setVolumeFn(val)
//     }
//      const showmoreClick = async()=>{
//         //console.log("called")
//         if(folder && songName && file && artist && time){
//             // must add playlist name, custom given by user
//             const folderName = isFav ? "LikedSongs":folder
//             //console.log("foldername",email)
//             const songParams = {folder:folderName,songName:songName,file:file,artist:artist,duration:time}
//             const response = email ? await fetch('https://grovifyec2.nidhiworks.com:443/insertPlaylist',{
//             method:"POST",
//             mode:"cors",
//             headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 email:email,
//                 playlist:folderName,
//                 songs:[songParams]
    
//               }),
//             }):
//             null;
//             if(response){
//                 //console.log("Show more ",response);
//             }
//         }
        
//     }
//     return(
//         <></>
//     )
// }


// export const togglePlay = PlayerApi.togglePlay;
// export const formatTime = PlayerApi.formatTime;
// export const handleFav = PlayerApi.handleFav;
