import React from 'react'

import avatar from '../../assets/author-dummy.png'
import { useAppSelector } from '../../hooks'

import classes from './UserInfo.module.scss'

const UserInfo = () => {
  // TODO hook in conditional statement?
  let username: string
  const userInInLocalStorage = localStorage.getItem('user')
  if (userInInLocalStorage) {
    username = JSON.parse(userInInLocalStorage).user.username
  } else {
    username = useAppSelector((state) => state.user.user.username)
  }
  return (
    <div className={classes.wrapper}>
      <span className={classes.name}>{username}</span>
      <img src={avatar} alt="user avatar" className={classes.img} />
    </div>
  )
}

export default UserInfo
