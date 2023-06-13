import React from 'react'
import { Link } from 'react-router-dom'

import HeaderButtons from '../HeaderButtons'
import classes from '../Header/Header.module.scss'
import { route } from '../../constants/constants'

const Header = () => {
  return (
    <header className={classes.header}>
      <h2 className={classes['header-title']}>
        <Link to={route.MainPage} className={classes['header-title__text']}>
          Realworld Blog
        </Link>
      </h2>
      <HeaderButtons />
    </header>
  )
}

export default Header
