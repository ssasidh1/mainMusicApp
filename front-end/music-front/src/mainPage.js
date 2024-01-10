import React from 'react'
import styles from './css/mainPage.module.css'
import { useNavigate } from 'react-router'

export default function MainPage() {
    const nav = useNavigate();
 const handleClick =()=>{
    nav('/login')
 }
  return (
    
    <div className={styles['main']}>
    <div className={styles['login-main']}>
        <img src='./Grovify.png' alt="grovify" className={styles['grove-logo']}/>
        <button className={styles['login-btn']} onClick={handleClick}>Connect</button>
    </div>
    <div className={styles['lap-div']}>
    <img src='./playlist.jpg' alt="Spotify" className={styles['laptop']}></img>
    </div>
    </div>
  )
}
