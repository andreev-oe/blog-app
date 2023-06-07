import React from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import classes from './SignUp.module.scss'

interface IFormInputs {
  username: string
  email: string
  password: string
  repeatPassword: string
  checkbox: boolean
}
const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)
const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()
  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label htmlFor="username" className={classes.label}>
          <span>Username</span>
          <input
            {...register('username', { required: true })}
            className={errors.username ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="username"
            type="text"
            placeholder={'Username'}
          />
          {errors.username && <span className={classes['error-text']}>Username is required</span>}
        </label>
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
        <label htmlFor="repeat-password" className={classes.label}>
          <span>Repeat Password</span>
          <input
            {...register('repeatPassword', { required: true })}
            className={errors.repeatPassword ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="repeat-password"
            type="password"
            placeholder={'Password'}
          />
          {errors.password && <span className={classes['error-text']}>Password is required</span>}
        </label>
        <label htmlFor="checkbox" className={classes.label}>
          <input
            {...register('checkbox', { required: true })}
            className={errors.checkbox ? `${classes.checkbox} ${classes['input--error']}` : classes.checkbox}
            id="checkbox"
            type="checkbox"
          />
          <span>I agree to the processing of my personal information. </span>
        </label>
        {errors.checkbox && <span className={classes['error-text']}>Checkbox is required</span>}
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
