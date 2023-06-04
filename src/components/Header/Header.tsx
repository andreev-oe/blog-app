import React from 'react'

import HeaderButtons from '../HeaderButtons'
import classes from '../Header/Header.module.scss'

const Header = () => {
  return (
    <header className={classes.header}>
      <h2 className={classes['header-title']}>Realworld Blog</h2>
      <HeaderButtons />
    </header>
  )
}

export default Header
