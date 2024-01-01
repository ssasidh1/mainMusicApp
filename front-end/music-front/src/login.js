import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import AuthUsersFromDB from './dB/authUsersFromDB';
import { TokenProvider,useToken } from './context'
function Login() {
    const email = useRef()
    const password = useRef()
    const nav = useNavigate();
    const {refreshToken,accessToken,setAccTk,setRefTk} = useToken();
    const navigateTo= ()=>{
        nav("/signup")
    }
    const handleLogin = async()=>{
      //console.log(email.current.value,password.current.value)
      const res = await AuthUsersFromDB(email.current.value,password.current.value)
      //console.log(res)
      if(res){
        setAccTk(res.token);
        setRefTk(res.refreshToken)
        localStorage.setItem('accessToken',res.token)
        localStorage.setItem('refreshToken',res.refreshToken)
        nav("/home")
      }
    }
  return (
    <div>
        <label>EmailID</label>
        <input ref={email}type="text"></input>
        <label>Password</label>
        <input ref= {password} type = "password"></input>
        <button onClick={handleLogin}>login</button>
        <button onClick={()=>navigateTo()}>createAccnt</button>
    </div>
  )
}

export default Login