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
          {errors.username && <span className={classes['error-text']}>{errors.username.message}</span>}
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
          {errors.email && <span className={classes['error-text']}>{errors.email.message}</span>}
        </label>
        <label htmlFor="password" className={classes.label}>
          <span>New password</span>
          <input
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              minLength: { value: 6, message: 'Password must be more than 5 symbols' },
              maxLength: { value: 40, message: 'Password must be less than 41 symbols' },
            })}
            className={errors.password ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="password"
            type="password"
            placeholder={'New password'}
          />
          {errors.password && <span className={classes['error-text']}>{errors.password.message}</span>}
        </label>
        <label htmlFor="repeat-password" className={classes.label}>
          <span>Avatar image (url)</span>
          <input
            {...register('image', {
              required: { value: true, message: 'Email address is required' },
              pattern: {
                value: /[-a-zA-Z0-9@:%_\\+.~#?&\\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\\+.~#?&\\/=]*)?/gi,
                message: 'Must be valid URL, for example https://bumper-stickers.ru/51861-thickbox_default/smayl.jpg',
              },
            })}
            className={errors.image ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="repeat-password"
            type="url"
            placeholder={'Avatar image'}
          />
          {errors.image && <span className={classes['error-text']}>{errors.image.message}</span>}
        </label>
        <button className={classes.button} type="submit">
          Save
        </button>
      </form>
    </section>
  )
}

export default EditProfile
