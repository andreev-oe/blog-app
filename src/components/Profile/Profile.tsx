import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import classes from './Profile.module.scss'

interface IFormInputs {
  email: string
  username: string
  password: string
  avatar: string
}
const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)
const Profile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()
  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Edit Profile</h2>
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
          <span>New password</span>
          <input
            {...register('password', { required: true })}
            className={errors.password ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="password"
            type="password"
            placeholder={'New password'}
          />
          {errors.password && <span className={classes['error-text']}>Password is required</span>}
        </label>
        <label htmlFor="repeat-password" className={classes.label}>
          <span>Avatar image (url)</span>
          <input
            {...register('avatar', { required: true })}
            className={errors.avatar ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="repeat-password"
            type="text"
            placeholder={'Avatar image'}
          />
          {errors.avatar && <span className={classes['error-text']}>Avatar is required</span>}
        </label>
        <button className={classes.button} type="submit">
          Save
        </button>
      </form>
    </section>
  )
}

export default Profile
