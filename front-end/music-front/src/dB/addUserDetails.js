import React from 'react'

export default async function AddUserDetails(user) {
    // console.log("user",user)
    const res = await fetch('http://ec2-54-237-118-91.compute-1.amazonaws.com:3005/signup',{
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json" 
        },
        
        body:JSON.stringify(user)
    });
    return res.json();
  }

