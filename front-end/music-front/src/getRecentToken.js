import React from 'react'

export default async function GetRecentToken(refreshToken) {
    // console.log("user",user)
    const res = await fetch('https://ec2-54-237-118-91.compute-1.amazonaws.com:4000/token',{
        method:"POST",
        mode:"cors",
        headers:{
            'Content-type': 'application/json',
        }, 
        body: JSON.stringify(refreshToken)
    });
    return res.json();
  }