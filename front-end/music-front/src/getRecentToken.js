import React from 'react'

export default async function GetRecentToken(refreshToken) {
    // console.log("user",user)
    const res = await fetch('http://localhost:4000/token',{
        method:"POST",
        mode:"cors",
        headers:{
            'Content-type': 'application/json',
        }, 
        body: JSON.stringify(refreshToken)
    });
    return res.json();
  }