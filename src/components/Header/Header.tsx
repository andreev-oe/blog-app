import React from 'react'
import { Link } from 'react-router-dom'

import HeaderButtons from '../HeaderButtons'
import classes from '../Header/Header.module.scss'

const Header = () => {
  return (
    <header className={classes.header}>
      <h2 className={classes['header-title']}>
        <Link to={'/'} className={classes['header-title__text']}>
          Realworld Blog
        </Link>
      </h2>
      <HeaderButtons />
    </header>
  )
}

export default Header
