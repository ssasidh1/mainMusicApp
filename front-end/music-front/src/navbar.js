import React from 'react'
import styles from './css/navbar.module.css'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useToken } from './context';
function Navbar() {
  const{username} = useToken()
  console.log("username",username)
  return (
    <div className={styles['container']}>
        <div className={styles['search']}>
            <SearchIcon/>
            <input type = 'text' placeholder='Artists, songs or podcasts'/>
        </div>
        <div className={styles['avatar']}>
            <a href='#'>
                <AccountCircleIcon sx={{color: 'silver', '&:hover': {color: 'white'}}}/>
                <span>{username}</span>
            </a>
        </div>
    </div>
  )
}

export default Navbar