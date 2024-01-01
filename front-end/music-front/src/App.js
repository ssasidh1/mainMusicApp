
import './App.css';
import AudioPlayer from './Audioplayer.js';
import Login from './login.js'
import Signup from './signup.js';
import Home from './home.js'
import { TokenProvider,useToken } from './context'
import {HashRouter, Navigate, Route,Routes} from "react-router-dom"
function App() {
  return (
    <TokenProvider>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path= "*" element = {<Navigate to = "/login"/>}/>
     </Routes>
     </TokenProvider>
  );
}

export default App;
