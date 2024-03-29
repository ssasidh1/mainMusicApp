
import './App.css';
import AudioPlayer from './Audioplayer.js';
import Login from './login.js'
import Signup from './signup.js';
import Home from './home.js'
import MainPage from './mainPage.js';
import {BodyMain } from './bodyMain.js';
import Body from "./body"
import { BodySelected } from './bodySelected.js';
import { TokenProvider,useToken } from './context'
import { PlayerProvider } from './playerContext.js';
import {HashRouter, Navigate, Route,Routes} from "react-router-dom"
import { useEffect } from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google'
import Cookies from 'js-cookie'
function App() {
  
  return (
    // <GoogleOAuthProvider  clientId={process.env.REACT_APP_CLIENT_ID}>
    <TokenProvider>
      <PlayerProvider>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/mainPage" element={<MainPage/>}/>
        <Route path= "*" element = {<Navigate to = "/MainPage"/>}/>
        <Route path="/playlist" element={<BodyMain/>} />
        <Route path="/track" element={<BodySelected/>} />
     </Routes>
     </PlayerProvider>
     </TokenProvider>
    //  </GoogleOAuthProvider>
  );
}

export default App;
