import React from 'react'

export default async function AuthUsersFromDB(email, password) {
    console.log("user",email,password)
    try{const res = await fetch('https://ec2-54-237-118-91.compute-1.amazonaws.com:3005/login',{
        method:"POST",
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'email': email,
            'password': password,
          }),
    });
    return res.json();}
    catch(e){
      console.log("err",e)
    }
  }

