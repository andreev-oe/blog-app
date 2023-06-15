import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Alert, Spin, Button, message, Popconfirm } from 'antd'
import Markdown from 'markdown-to-jsx'
import { format } from 'date-fns'

import { articlesSlice } from '../../store/articlesSlice/articlesSlice'
import { getArticle, deleteArticle, favoriteArticle } from '../../store/articlesSlice/articleActions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import classes from '../Article/Article.module.scss'
import like from '../../assets/like.svg'
import likeActive from '../../assets/like-active.svg'
import authorDummy from '../../assets/author-dummy.png'

const ERROR_MESSAGE = 'Sorry, content not loaded, check your internet connection and try to update page'
const DATE_FORMAT = 'MMMM d, yyyy'
const Article = () => {
  const dispatch = useAppDispatch()
  const setEdit = articlesSlice.actions.setEdit
  const navigate = useNavigate()
  const { slug } = useParams()
  const { article, error, loading } = useAppSelector((state) => state.articles)
  const { username: stateUsername, token } = useAppSelector((state) => state.user.user)
  const articleAuthor = useAppSelector((state) => state.articles.article?.author.username)
  const { favorited } = article
  const onLike = () => {
    if (slug && token) {
      const data = {
        favorited,
        article,
        token,
        slug: {
          slug,
        },
      }
      dispatch(favoriteArticle(data))
    }
  }
  const onDelete = () => {
    if (slug && token) {
      const data = {
        token,
        slug: {
          slug,
        },
      }
      dispatch(deleteArticle(data))
      navigate('/')
    }
  }
  const onEdit = () => {
    dispatch(setEdit(true))
    navigate(`/articles/${slug}/edit`)
  }
  const confirm = () => {
    onDelete()
    message.success('Article deleted')
  }
  const actions = (
    <div className={classes.actions}>
      <Popconfirm
        title="Delete the article"
        description="Are you sure to delete this article?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
        placement="bottom"
      >
        <Button className={`${classes.action} ${classes['action--delete']}`} danger>
          Delete
        </Button>
      </Popconfirm>
      <button onClick={onEdit} className={`${classes.action} ${classes['action--edit']}`} type="button">
        Edit
      </button>
    </div>
  )
  let showArticle = null
  if (article) {
    const { title, favoritesCount, tagList, description, createdAt, author } = article
    const { username, image } = author
    showArticle =
      !loading && !error && article ? (
        <>
          <article className={classes.article}>
            <div className={classes['article-content']}>
              <div className={classes['title-wrapper']}>
                <h2 className={classes.title}>{title}</h2>
                <button onClick={onLike} type={'button'} className={classes.button} disabled={!token}>
                  <img className={classes['like-icon']} src={favorited ? likeActive : like} alt={'likes'} />
                </button>
                <span className={classes['likes-count']}>{favoritesCount}</span>
              </div>
              <div className={classes.tags}>
                {tagList.map((tag, index) => (
                  <div key={index} className={classes.tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <p className={classes.text}>{description}</p>
              <Markdown>{article ? article.body : ''}</Markdown>
            </div>
            <div className={classes['author-wrapper']}>
              <div className={classes['article-author']}>
                <div>
                  <p className={classes['author-name']}>{username}</p>
                  <p className={classes.date}>{createdAt ? format(new Date(createdAt), DATE_FORMAT) : ''}</p>
                </div>
                <img className={classes['author-photo']} src={image ? image : authorDummy} alt={'author-photo'} />
              </div>
              {stateUsername === articleAuthor ? actions : null}
            </div>
          </article>
        </>
      ) : null
  }
  const spinner = loading ? (
    <div className="spinner-container">
      <Spin tip="Loading article...">
        <div className="content" />
      </Spin>
    </div>
  ) : null
  const errorMessage = error ? <Alert showIcon type={'error'} message={ERROR_MESSAGE} /> : null
  useEffect(() => {
    if (slug) {
      const data = {
        token,
        slug: {
          slug,
        },
      }
      dispatch(getArticle(data))
    }
  }, [slug])
  return (
    <div className={classes.container}>
      {showArticle}
      {spinner}
      {errorMessage}
    </div>
  )
}

export default Article
