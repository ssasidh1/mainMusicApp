import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenProvider,useToken } from './context'
import SongList from './songList';
function Home() {
    const {refreshToken,accessToken,setAccTk,setRefTk} = useToken();
    const nav = useNavigate();

    useEffect(()=>{
        //console.log("l",localStorage.getItem('accessToken'))
        if(accessToken === null || refreshToken=== null){
            setAccTk(localStorage.getItem('accessToken'))
            setRefTk(localStorage.getItem('refreshToken'))
        }
    },[refreshToken,accessToken])
  return (
    <div>
      {accessToken}
      {accessToken && <SongList token={{at:accessToken, rt:refreshToken}}/>}
    </div>
  )
}

export default Home