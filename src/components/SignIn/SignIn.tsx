import React from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import classes from './SignIn.module.scss'

interface IFormInputs {
  email: string
  password: string
}
const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)
const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()
  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label htmlFor="email" className={classes.label}>
          <span>Email address</span>
          <input
            {...register('email', { required: true })}
            className={errors.email ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="email"
            type="email"
            placeholder={'Email address'}
          />
          {errors.email && <span className={classes['error-text']}>Email is required</span>}
        </label>
        <label htmlFor="password" className={classes.label}>
          <span>Password</span>
          <input
            {...register('password', { required: true })}
            className={errors.password ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="password"
            type="password"
            placeholder={'Password'}
          />
          {errors.password && <span className={classes['error-text']}>Password is required</span>}
        </label>
        <button className={classes.button} type="submit">
          Login
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
