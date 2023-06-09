import React from 'react'

import avatar from '../../assets/author-dummy.png'
import { useAppSelector } from '../../hooks'

import classes from './UserInfo.module.scss'

const UserInfo = () => {
  const usernameFromState = useAppSelector((state) => state.user.user.username)
  const userInInLocalStorage = JSON.parse(localStorage.getItem('user') || '')
  const username: string = usernameFromState && userInInLocalStorage.user.username
  return (
    <div className={classes.wrapper}>
      <span className={classes.name}>{username}</span>
      <img src={avatar} alt="user avatar" className={classes.img} />
    </div>
  )
}

export default UserInfo
