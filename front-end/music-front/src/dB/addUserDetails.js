import React from 'react'

export default async function AddUserDetails(user) {
    // console.log("user",user)
    const res = await fetch('https://grovifyec2.nidhiworks.com:443/signup',{
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json" 
        },
        
        body:JSON.stringify(user)
    });
    return res.json();
  }

