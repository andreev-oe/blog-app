import React from 'react'
import { Link } from 'react-router-dom'

import classes from './SignIn.module.scss'

const SignIn = () => {
  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Create new account</h2>
      <form action="#" className={classes.form}>
        <label htmlFor="email" className={classes.label}>
          <span>Email address</span>
          <input className={classes.input} id="email" type="email" name="email" placeholder={'Email address'} />
        </label>
        <label htmlFor="password" className={classes.label}>
          <span>Password</span>
          <input className={classes.input} id="password" type="password" name="password" placeholder={'Password'} />
        </label>
        <button className={classes.button} type="submit">
          Create
        </button>
      </form>
      <p className={classes.info}>
        Don’t have an account?{' '}
        <Link className={classes.link} to="/sign-up">
          Sign Up.
        </Link>
      </p>
    </section>
  )
}

export default SignIn
