import React from 'react'

export default async function AuthUsersFromDB(email, password) {
    try{console.log("user",email,password)
    const res = await fetch('https://grovifyec2.nidhiworks.com:443/login',{
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

