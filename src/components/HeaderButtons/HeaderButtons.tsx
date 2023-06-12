import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import classes from '../HeaderButtons/HeaderButtom.module.scss'
import UserInfo from '../UserInfo'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { authSlice } from '../../store/authSlice'
import { articlesSlice } from '../../store/articlesSlice'

const HeaderButtons = () => {
  const setEdit = articlesSlice.actions.setEdit
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const logOutUser = authSlice.actions.logOutUser
  const logOut = () => {
    dispatch(logOutUser())
    navigate('/')
  }
  const user = useAppSelector((state) => state.user.user)
  const userInInLocalStorage = JSON.parse(localStorage.getItem('user') || '""')
  const userLoggedJSX = (
    <>
      <Link to={'/new-article'}>
        <button onClick={() => dispatch(setEdit(false))} className={`${classes['article-button']} ${classes.button}`}>
          Create article
        </button>
      </Link>
      <Link to={'/profile'}>
        <button className={`${classes.profile} ${classes.button}`}>
          <UserInfo />
        </button>
      </Link>
      <button onClick={logOut} className={`${classes['log-out']} ${classes.button}`}>
        Log Out
      </button>
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
  return (
    <div className={classes['authorize-buttons']}>
      {userInInLocalStorage.username || user.username ? userLoggedJSX : userNotLoggedJSX}
    </div>
  )
}

export default HeaderButtons
