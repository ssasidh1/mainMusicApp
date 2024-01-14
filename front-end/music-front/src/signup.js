import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import styles from './css/signup.module.css'
import AddUserDetails from './dB/addUserDetails'
 function Signup() {
    const nav = useNavigate()
    const emailID = useRef();
    const password = useRef()
    const confirmPassword = useRef()
    const regexE = /^([^@]+)(@[^\.]+)(\.\w+)$/
    const regexP = /^.{10,}$/
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username,setUsername] = useState('');
    const [errors,setErrors] = useState({
        email:false,
        password:false,
        confirmPassword:false
    })
    const signupSubmit = async (e)=>{
    e.preventDefault()
    if(regexE.test(emailID.current.value)){
        setEmail(emailID.current.value)
        const username =emailID.current.value.match(regexE)[1]
        // console.log("match",username)
        setUsername(username.toLowerCase())
        setErrors((prev)=>({
            ...prev,
            email:false
        }
        ))
    }
    else{
        setErrors((prev)=>({
            ...prev,
            email:true
        }
        ))
    }
    if(password.current.value === confirmPassword.current.value){
        setErrors((prev)=>({
            ...prev,
            confirmPassword:false
        }
        ))
    }else{
        setErrors((prev)=>({
            ...prev,
            confirmPassword:true
        }
        ))
    }
    if(regexP.test(password.current.value)){
        setPass(password.current.value)
        setErrors((prev)=>({
            ...prev,
            password:false
        }
        ))
        
    }
    else{
        setErrors((prev)=>({
            ...prev,
            password:true
        }
        ))  
    }
    // console.log(errors.email , errors.confirmPassword , errors.password)
    if(!errors.email && !errors.confirmPassword && !errors.password){
        // console.log("UI")
        if(email !== ""&& pass !=="")
       {
        const res = await AddUserDetails({email:email,password:pass,username:username})
        console.log("appended",res);
        nav('/login');
    }
       
    }
    }
    const navigateTo= ()=>{
        nav("/login")
    }

    
  return (
    <div className= {styles['main']}>
        {/* <img src='./apple-music-note.jpg' alt="music" className={styles['music']}></img> */}
        <div className={styles['card']}>
        <div className={styles['title']}>Sign up to listen <br/><center>on Grovify</center></div>
        <input className={styles['email']} placeholder='emailid@mail.com' type = "text" ref = {emailID} required></input>
        {errors.email && <p>Invalid emaildID</p>}
        <input className={styles['password']}ref= {password} type = "password" placeholder='XyZ@$%123' required></input>
        {errors.password && <p>password must be atleast 10 letters</p>}
        <input  className={styles['password']}type="text" ref = {confirmPassword} placeholder="confirm password"  required></input>
        {errors.confirmPassword && <p>Passwords doesnt match</p>}
        <button className={styles['login-btn']}onClick={signupSubmit}>Sign in</button>
        <div className={styles['hr-line']}></div>
        <div>
            <p className={styles["p-create"]}>Return to log in</p>
            <a href="#" className={styles["btn-create"]} onClick={()=>navigateTo()}>Log in to Grovify</a>
        </div>
        </div>
    </div>
  )
}

export default Signup