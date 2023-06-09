import React from 'react'

import avatar from '../../assets/author-dummy.png'
import { useAppSelector } from '../../hooks'

import classes from './UserInfo.module.scss'

const UserInfo = () => {
  const { username, image } = useAppSelector((state) => state.user.user)
  const userInInLocalStorage = JSON.parse(localStorage.getItem('user') || '')
  const shownUsername: string = username && userInInLocalStorage.user.username
  return (
    <div className={classes.wrapper}>
      <span className={classes.name}>{shownUsername}</span>
      <img src={image ? image : avatar} alt="user avatar" className={classes.img} />
    </div>
  )
}

export default UserInfo
