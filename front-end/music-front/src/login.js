import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import AuthUsersFromDB from './dB/authUsersFromDB';
import { TokenProvider,useToken } from './context'
import styles from './css/login.module.css';
function Login() {
    const email = useRef()
    const password = useRef()
    const nav = useNavigate();
    const {refreshToken,accessToken,setAccTk,setRefTk,setUserEmail} = useToken();
    const navigateTo= ()=>{
        nav("/signup")
    }
    const handleLogin = async()=>{
      console.log(email.current.value,password.current.value)
      const res = await AuthUsersFromDB(email.current.value,password.current.value)
      
      //console.log(res)
      if(res){
        setAccTk(res.token);
        setRefTk(res.refreshToken)
        setUserEmail(email.current.value);
        localStorage.setItem('accessToken',res.token)
        localStorage.setItem('refreshToken',res.refreshToken)
        nav("/home")
      }
    }
  return (
    <div className={styles['main']}>
      <img src='./music.png' alt="music" className={styles['music']}></img>
        <div className={styles['card']}>
          {/* <h3 className={styles['h3-div']}>LOG IN</h3> */}
          <div className={styles['title']}>Log in to Grovify</div>
          <input className={styles['email']} ref={email}type="text" placeholder='emailid@mail.com'></input>
          <input className={styles['password']}ref= {password} type = "password" placeholder='password'></input>
          <button className={styles['login-btn']}onClick={handleLogin}>LOG IN</button>
          <div className={styles["newacnt"]}>
                <a href="#">Forgot password?</a>
                
        </div>
       <div className={styles['hr-line']}></div>
        <div>
            <p className={styles["p-create"]}>Don't have an account?</p>
            <a href="#" className={styles["btn-create"]} onClick={()=>navigateTo()}>Sign up for Grovify</a>
        </div>
        <img src='./Grovify.png' alt="grovify" className={styles['grove-logo']}></img>
        </div>
        
    </div>
  )
}

export default Login