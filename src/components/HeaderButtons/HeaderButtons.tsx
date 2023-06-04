import React from 'react'

import classes from '../HeaderButtons/HeaderButtom.module.scss'

const HeaderButtons = () => {
  return (
    <div className={classes['authorize-buttons']}>
      <button className={`${classes['sign-in']} ${classes.buttons}`}>Sign In</button>
      <button className={`${classes['sign-up']} ${classes.buttons}`}>Sign Up</button>
    </div>
  )
}

export default HeaderButtons
