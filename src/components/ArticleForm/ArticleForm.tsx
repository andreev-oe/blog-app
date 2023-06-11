import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import classes from '../ArticleForm/ArticleFrom.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { articlesSlice, updateArticle, postArticle } from '../../store/articlesSlice'
import { IPostArticle, IUpdatedArticle } from '../../types'

interface IFormInputs {
  title: string
  description: string
  body: string
  tag: string
}

const ArticleForm = () => {
  const dispatch = useAppDispatch()
  const setEdit = articlesSlice.actions.setEdit
  const { slug } = useParams()
  const navigate = useNavigate()
  const { token } = useAppSelector((state) => state.user.user)
  const { title, description, body, tagList, edit } = useAppSelector((state) => state.articles.article)
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { title, description, body, tag } = data
    const updatedArticle: IUpdatedArticle = {
      token,
      slug,
      updatedArticle: {
        title,
        description,
        body,
        tagList: [tag],
      },
    }
    const article: IPostArticle = {
      article: {
        title,
        description,
        body,
        tagList: [tag],
        token,
      },
    }
    if (edit) {
      dispatch(updateArticle(updatedArticle))
      dispatch(setEdit(false))
    } else {
      dispatch(postArticle(article))
    }
    navigate('/')
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()
  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Create new article</h2>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label htmlFor="title" className={classes.label}>
          <span>Title</span>
          <input
            {...register('title', {
              required: { value: true, message: 'Title is required' },
            })}
            className={errors.title ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="title"
            type="text"
            placeholder={'Title'}
            defaultValue={edit ? title : ''}
          />
          {errors.title && <span className={classes['error-text']}>{errors.title.message}</span>}
        </label>
        <label htmlFor="description" className={classes.label}>
          <span>Short description</span>
          <input
            {...register('description', {
              required: { value: true, message: 'Short description is required' },
            })}
            className={errors.description ? `${classes.input} ${classes['input--error']}` : classes.input}
            id="description"
            type="text"
            placeholder={'Title'}
            defaultValue={edit ? description : ''}
          />
          {errors.description && <span className={classes['error-text']}>{errors.description.message}</span>}
        </label>
        <label htmlFor="text" className={classes.label}>
          <span>Text</span>
          <textarea
            {...register('body', {
              required: { value: true, message: 'Text is required' },
            })}
            className={errors.body ? `${classes.textarea} ${classes['textarea--error']}` : classes.textarea}
            id="text"
            rows={10}
            placeholder={'Text'}
            defaultValue={edit ? body : ''}
          />
          {errors.body && <span className={classes['error-text']}>{errors.body.message}</span>}
        </label>
        <div className={classes['tags-wrapper']}>
          <label htmlFor="tag" className={`${classes.label} ${classes.tags}`}>
            <span>Tags</span>
            <input
              {...register('tag')}
              className={`${classes.input} ${classes['input-tags']}`}
              id="tag"
              type="text"
              placeholder={'Tag'}
              defaultValue={edit ? tagList : ''}
            />
          </label>
          <button className={`${classes.action} ${classes['action--delete']}`} type="button">
            Delete
          </button>
          <button className={`${classes.action} ${classes['action--add']}`} type="button">
            Add tag
          </button>
        </div>
        <button className={classes.button} type="submit">
          Send
        </button>
      </form>
    </section>
  )
}

export default ArticleForm
