import React from 'react'

import avatar from '../../assets/author-dummy.png'

import classes from './UserInfo.module.scss'

const UserInfo = () => {
  return (
    <div className={classes.wrapper}>
      <span className={classes.name}>John Doe</span>
      <img src={avatar} alt="user avatar" className={classes.img} />
    </div>
  )
}

export default UserInfo
