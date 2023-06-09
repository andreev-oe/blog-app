import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { signUpUser } from '../../store/authSlice'

import classes from './SignUp.module.scss'

interface IFormInputs {
  username: string
  email: string
  password: string
  repeatPassword: string
  checkbox: boolean
}

const SignUp = () => {
  const {
    user: { username },
    serverErrors,
  } = useAppSelector((state) => state.user)
  useEffect(() => {
    reset()
  }, [username])
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { username, email, password } = data
    const user = {
      username,
      email,
      password,
    }
    dispatch(signUpUser({ user }))
  }
  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()
  const signUpPage = (
    <section className={classes.section}>
      <h2 className={classes.title}>Create new account</h2>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label htmlFor="username" className={classes.label}>
          <span>Username</span>
          <input
            {...register('username', {
              required: { value: true, message: 'Username is required' },
              minLength: { value: 3, message: 'Username must be more than 2 symbols' },
              maxLength: { value: 20, message: 'Username must be less than 21 symbols' },
            })}
            className={errors.username ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="username"
            type="text"
            placeholder={'Username'}
          />
          {(errors.username || serverErrors) && (
            <span className={classes['error-text']}>{errors.username?.message || serverErrors?.username}</span>
          )}
        </label>
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
          {(errors.email || serverErrors) && (
            <span className={classes['error-text']}>{errors.email?.message || serverErrors?.email}</span>
          )}
        </label>
        <label htmlFor="password" className={classes.label}>
          <span>Password</span>
          <input
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              minLength: { value: 6, message: 'Password must be more than 5 symbols' },
              maxLength: { value: 40, message: 'Password must be less than 41 symbols' },
            })}
            className={errors.password ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="password"
            type="password"
            placeholder={'Password'}
          />
          {(errors.password || serverErrors) && (
            <span className={classes['error-text']}>{errors.password?.message || serverErrors?.password}</span>
          )}
        </label>
        <label htmlFor="repeat-password" className={classes.label}>
          <span>Repeat Password</span>
          <input
            {...register('repeatPassword', {
              required: { value: true, message: 'Confirm password' },
              validate: {
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return 'Your passwords do no match'
                  }
                },
              },
            })}
            className={errors.repeatPassword ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="repeat-password"
            type="password"
            placeholder={'Password'}
          />
          {errors.repeatPassword && <span className={classes['error-text']}>{errors.repeatPassword.message}</span>}
        </label>
        <label htmlFor="checkbox" className={classes.label}>
          <input
            {...register('checkbox', {
              required: { value: true, message: 'You have to agree with processing of your information' },
            })}
            className={errors.checkbox ? `${classes.checkbox} ${classes['input--error']}` : classes.checkbox}
            id="checkbox"
            type="checkbox"
          />
          <span>I agree to the processing of my personal information. </span>
        </label>
        {errors.checkbox && <span className={classes['error-text']}>{errors.checkbox.message}</span>}
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
  return username ? <Navigate to={'/'} /> : signUpPage
}

export default SignUp
