import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { updateUser } from '../../store/authSlice'
import { IUserData } from '../../types'

import classes from './EditProfile.module.scss'

interface IFormInputs {
  email: string
  username: string
  password: string
  image: string
  token: string
}
const EditProfile = () => {
  const navigate = useNavigate()
  const { username, token } = useAppSelector((state) => state.user.user)
  useEffect(() => {
    reset()
  }, [username])
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { username, email, password, image } = data
    const user: IUserData = {
      username,
      email,
      password,
      image,
      token,
    }
    dispatch(updateUser(user))
    if (!Object.entries(errors).length) {
      navigate('/')
    }
  }
  const {
    register,
    reset,
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
            {...register('image', { required: true })}
            className={errors.image ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="repeat-password"
            type="text"
            placeholder={'Avatar image'}
          />
          {errors.image && <span className={classes['error-text']}>Avatar is required</span>}
        </label>
        <button className={classes.button} type="submit">
          Save
        </button>
      </form>
    </section>
  )
}

export default EditProfile
