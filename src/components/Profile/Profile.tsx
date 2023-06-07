import React from 'react'

import classes from './Profile.module.scss'

const Profile = () => {
  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Edit Profile</h2>
      <form action="#" className={classes.form}>
        <label htmlFor="username" className={classes.label}>
          <span>Username</span>
          <input className={classes.input} id="username" type="text" name="username" placeholder={'Username'} />
        </label>
        <label htmlFor="email" className={classes.label}>
          <span>Email address</span>
          <input className={classes.input} id="email" type="email" name="email" placeholder={'Email address'} />
        </label>
        <label htmlFor="password" className={classes.label}>
          <span>New password</span>
          <input className={classes.input} id="password" type="password" name="password" placeholder={'New password'} />
        </label>
        <label htmlFor="repeat-password" className={classes.label}>
          <span>Avatar image (url)</span>
          <input className={classes.input} id="repeat-password" type="text" placeholder={'Avatar image'} />
        </label>
        <button className={classes.button} type="submit">
          Save
        </button>
      </form>
    </section>
  )
}

export default Profile
