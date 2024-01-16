import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import AuthUsersFromDB from './dB/authUsersFromDB';
import { TokenProvider,useToken } from './context'
import styles from './css/login.module.css';
import Cookies from 'js-cookie'
import GoogleLoginPage from './GoogleLoginPage';

import { GoogleLogin } from '@react-oauth/google';
function Login() {
  
    const email = useRef()
    const password = useRef()
    const nav = useNavigate();
    const {refreshToken,accessToken,setAccTk,setRefTk,setUserEmail,setUserName,username} = useToken();
    const navigateTo= ()=>{
        nav("/signup")
    }
 
    useEffect(()=>{
      
      console.log("cookie get",Cookies.get('username'))
  if(Cookies.get('username')){
    setUserName(Cookies.get('username'));
  }
  else{
    setUserName("FreeUser");
  }
      
      
      console.log(" cookie username",username)
    },[])
    const handleLogin = async()=>{
      console.log(email.current.value,password.current.value)
      const res = await AuthUsersFromDB(email.current.value,password.current.value)
      console.log("login",res)
      
      Cookies.set('username',res[1].username,{secure:true})
      
      if(res){
        setAccTk(res[0].token);
        setRefTk(res[0].refreshToken)
        setUserEmail(email.current.value);
        Cookies.set('accessToken',res[0].token,{secure:true})
        Cookies.set('refreshToken',res[0].refreshToken,{secure:true})
        nav("/home")
      }
    }
    const freeAcnt = ()=>{
      setUserName("FreeUser")
      setUserEmail("freeuser@gmail.com")
      Cookies.set('username',"FreeUser",{secure:true})
      nav('/home')
    }
  return (
    <div className={styles['main']}>
      <img src='./musicNoBG.png' alt="music" className={styles['music']}></img>
        <div className={styles['card']}>
          {/* <h3 className={styles['h3-div']}>LOG IN</h3> */}
          <div className={styles['title']}>Log in to Grovify</div>
          <input className={styles['email']} ref={email}type="text" placeholder='emailid@mail.com'></input>
          <input className={styles['password']}ref= {password} type = "password" placeholder='XyZ@$%123'></input>
          <button className={styles['login-btn']}onClick={handleLogin}>LOG IN</button>
          <div className={styles["newacnt"]}>
                <a disabled href="#">Forgot password?</a>
                
        </div>
       <div className={styles['hr-line']}></div>
        <div>
            <p className={styles["p-create"]}>Don't have an account?</p>
            <a href="/#/signup" className={styles["btn-create"]} onClick={()=>navigateTo()}>Sign up for Grovify</a>
        </div>
        <div  className={styles['free']} onClick={freeAcnt}>Try for Free</div>
        <img src='./Grovify.png' alt="grovify" className={styles['grove-logo']}></img>
        </div>
        
        {/* <GoogleLoginPage/> */}


    </div>
    
  )
}

export default Login