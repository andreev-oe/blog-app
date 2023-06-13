import React from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import classes from '../ArticleForm/ArticleFrom.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { articlesSlice, updateArticle, postArticle, getArticles } from '../../store/articlesSlice'
import { IPostArticle, IUpdatedArticle } from '../../types'

interface IFormInputs {
  title: string
  description: string
  body: string
  tagList: { name: string }[]
}

const ARTICLES_PER_PAGE = 5
const ArticleForm = () => {
  const dispatch = useAppDispatch()
  const setEdit = articlesSlice.actions.setEdit
  const { slug } = useParams()
  const navigate = useNavigate()
  const { token } = useAppSelector((state) => state.user.user)
  const { article, activePage } = useAppSelector((state) => state.articles)
  const { title, description, body, tagList, edit } = article
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { title, description, body, tagList } = data
    const updatedArticle: IUpdatedArticle = {
      token,
      slug,
      updatedArticle: {
        title,
        description,
        body,
        tagList: tagList.map((tag) => tag.name),
      },
    }
    const article: IPostArticle = {
      article: {
        title,
        description,
        body,
        tagList: tagList.map((tag) => tag.name),
        token,
      },
    }
    if (edit) {
      dispatch(updateArticle(updatedArticle))
      dispatch(setEdit(false))
    } else {
      dispatch(postArticle(article))
    }
    if (token) {
      const data = {
        token,
        offset: activePage > 1 ? (activePage - 1) * ARTICLES_PER_PAGE : 0,
      }
      dispatch(getArticles(data))
    }
    navigate('/')
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInputs>({
    defaultValues: {
      title: edit ? title : '',
      description: edit ? description : '',
      body: edit ? body : '',
      tagList: edit ? tagList.map((tag) => ({ name: tag })) : [{}],
    },
  })
  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })
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
          />
          {errors.body && <span className={classes['error-text']}>{errors.body.message}</span>}
        </label>
        <div className={classes['tags-wrapper']}>
          <label htmlFor="tagList" className={`${classes.label} ${classes.tags}`}>
            <span>Tags</span>
            {fields.map((filed, index, array) => {
              return (
                <div key={filed.id} className={classes['tag-error-wrapper']}>
                  {errors.tagList && (
                    <span className={classes['error-text']}>{errors.tagList?.[index]?.name?.message}</span>
                  )}
                  <div key={filed.id} className={classes['tag-wrapper']}>
                    <input
                      {...register(`tagList.${index}.name` as const, {
                        required: { value: true, message: 'Tag filed cant be empty' },
                      })}
                      className={
                        errors.description
                          ? `${classes.input} ${classes['input-tags--error']}`
                          : `${classes.input} ${classes['input-tags']}`
                      }
                      key={filed.id}
                      type="text"
                      placeholder={'Tag'}
                    />
                    <button
                      onClick={() => (array.length > 1 ? remove(index) : null)}
                      className={`${classes.action} ${classes['action--delete']}`}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </label>
          <button
            onClick={() =>
              append({
                name: '',
              })
            }
            className={`${classes.action} ${classes['action--add']}`}
            type="button"
          >
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
