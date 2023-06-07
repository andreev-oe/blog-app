import React from 'react'
import { Link } from 'react-router-dom'

import classes from './SignUp.module.scss'

const SignUp = () => {
  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Create new account</h2>
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
          <span>Password</span>
          <input className={classes.input} id="password" type="password" name="password" placeholder={'Password'} />
        </label>
        <label htmlFor="repeat-password" className={classes.label}>
          <span>Repeat Password</span>
          <input className={classes.input} id="repeat-password" type="password" placeholder={'Password'} />
        </label>
        <label htmlFor="checkbox" className={classes.label}>
          <input className={classes.checkbox} id="checkbox" type="checkbox" />
          <span>I agree to the processing of my personal information</span>
        </label>
        <button className={classes.button} type="submit">
          Create
        </button>
      </form>
      <p className={classes.info}>
        Already have an account?{' '}
        <Link className={classes.link} to="/sign-in">
          Sign In.
        </Link>
      </p>
    </section>
  )
}

export default SignUp
