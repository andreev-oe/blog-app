import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import classes from '../HeaderButtons/HeaderButtom.module.scss'
import UserInfo from '../UserInfo'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { authSlice } from '../../store/authSlice/authSlice'
import { articlesSlice } from '../../store/articlesSlice/articlesSlice'
import { route } from '../../constants/constants'

const HeaderButtons = () => {
  const setEdit = articlesSlice.actions.setEdit
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const logOutUser = authSlice.actions.logOutUser
  const logOut = () => {
    dispatch(logOutUser())
    navigate(route.MainPage)
  }
  const user = useAppSelector((state) => state.user.user)
  const userInInLocalStorage = JSON.parse(localStorage.getItem('user') || '""')
  const userLoggedJSX = (
    <>
      <Link to={`/${route.ArticleForm}`}>
        <button onClick={() => dispatch(setEdit(false))} className={`${classes['article-button']} ${classes.button}`}>
          Create article
        </button>
      </Link>
      <Link to={`/${route.EditProfile}`}>
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
      <Link to={`/${route.SignIn}`}>
        <button className={`${classes['sign-in']} ${classes.button}`}>Sign In</button>
      </Link>
      <Link to={`/${route.SignUp}`}>
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
