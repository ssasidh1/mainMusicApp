import React from 'react'

export default async function AuthUsersFromDB(email, password) {
    console.log("user",email,password)
    const res = await fetch('http://localhost:3005/login',{
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
    return res.json();
  }

