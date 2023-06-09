import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { signInUser } from '../../store/authSlice'

import classes from './SignIn.module.scss'

interface IFormInputs {
  email: string
  password: string
}
const SignIn = () => {
  const username = useAppSelector((state) => state.user.user.username)
  useEffect(() => {
    reset()
  }, [username])
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { email, password } = data
    const user = {
      email,
      password,
    }
    dispatch(signInUser({ user }))
  }
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()
  const signInPage = (
    <section className={classes.section}>
      {username ? <Navigate to={'/'} /> : ''}
      <h2 className={classes.title}>Sign In</h2>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label htmlFor="email" className={classes.label}>
          <span>Email address</span>
          <input
            {...register('email', {
              required: { value: true, message: 'Email address is required' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: 'Must be valid email, for example john.doe@gmail.com',
              },
            })}
            className={errors.email ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="email"
            type="email"
            placeholder={'Email address'}
          />
          {errors.email && <span className={classes['error-text']}>{errors.email.message}</span>}
        </label>
        <label htmlFor="password" className={classes.label}>
          <span>Password</span>
          <input
            {...register('password', {
              required: { value: true, message: 'Password is required' },
            })}
            className={errors.password ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="password"
            type="password"
            placeholder={'Password'}
          />
          {errors.password && <span className={classes['error-text']}>{errors.password.message}</span>}
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
  return username ? <Navigate to={'/'} /> : signInPage
}

export default SignIn
