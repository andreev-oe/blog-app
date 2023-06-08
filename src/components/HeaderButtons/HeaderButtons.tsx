import React from 'react'
import { Link } from 'react-router-dom'

import classes from '../HeaderButtons/HeaderButtom.module.scss'
import UserInfo from '../UserInfo'

const clearLocalStorage = () => {
  localStorage.clear()
}
const userLoggedJSX = (
  <>
    <button className={`${classes['article-button']} ${classes.button}`}>Create article</button>
    <Link to={'/profile'}>
      <button className={`${classes.profile} ${classes.button}`}>
        <UserInfo />
      </button>
    </Link>
  </>
)
const userNotLoggedJSX = (
  <>
    <Link to={'/sign-in'}>
      <button className={`${classes['sign-in']} ${classes.button}`}>Sign In</button>
    </Link>
    <Link to={'/sign-up'}>
      <button className={`${classes['sign-up']} ${classes.button}`}>Sign Up</button>
    </Link>
  </>
)

const HeaderButtons = () => {
  const userInInLocalStorage = localStorage.getItem('user')
  return (
    <div className={classes['authorize-buttons']}>
      {userInInLocalStorage ? userLoggedJSX : userNotLoggedJSX}
      <button onClick={clearLocalStorage} className={`${classes['log-out']} ${classes.button}`}>
        Log Out
      </button>
    </div>
  )
}

export default HeaderButtons
