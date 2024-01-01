import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
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
       {const res = await AddUserDetails({email:email,password:pass,username:username})}
       
    }
    }

    
  return (
    <div>
        <label>EmailID</label>
        <input type = "text" ref = {emailID} required></input>
        {errors.email && <p>Invalid emaildID</p>}
        <label>Password</label>
        <input type="password" ref = {password} required></input>
        {errors.password && <p>password must be atleast 10 letters</p>}
        <label>Confirm Password</label>
        <input type="text" ref = {confirmPassword}  required></input>
        {errors.confirmPassword && <p>Passwords doesnt match</p>}
        <button onClick={signupSubmit}>Submit</button>
    </div>
  )
}

export default Signup