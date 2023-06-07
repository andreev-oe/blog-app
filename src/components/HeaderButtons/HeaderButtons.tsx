import React from 'react'
import { Link } from 'react-router-dom'

import classes from '../HeaderButtons/HeaderButtom.module.scss'

const HeaderButtons = () => {
  return (
    <div className={classes['authorize-buttons']}>
      <Link to={'/sign-in'}>
        <button className={`${classes['sign-in']} ${classes.buttons}`}>Sign In</button>
      </Link>
      <Link to={'/sign-up'}>
        <button className={`${classes['sign-up']} ${classes.buttons}`}>Sign Up</button>
      </Link>
    </div>
  )
}

export default HeaderButtons
