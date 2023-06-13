import React from 'react'
import { Link } from 'react-router-dom'

import like from '../../assets/like.png'
import likeActive from '../../assets/like-active.png'
import authorDummy from '../../assets/author-dummy.png'
import { IArticle } from '../../types'
import { articlesSlice, favoriteArticle } from '../../store/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

import classes from './ArticlePreview.module.scss'

const ArticlePreview = ({
  title,
  favoritesCount,
  tagList,
  description,
  createdAt,
  author,
  slug,
  favorited,
}: IArticle) => {
  const { username, image } = author
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.user.token)
  const { article } = useAppSelector((state) => state.articles)
  const { setActiveArticleSlug } = articlesSlice.actions
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
      dispatch(setActiveArticleSlug(slug))
      dispatch(favoriteArticle(data))
    }
  }
  return (
    <article className={classes.article}>
      <div className={classes['article-content']}>
        <div className={classes['title-wrapper']}>
          <Link to={`/articles/${slug}`} className={classes.link}>
            <h2 className={classes.title}>{title}</h2>
          </Link>
          <button onClick={onLike} type={'button'} className={classes.button}>
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
      </div>
      <div className={classes['article-author']}>
        <div className={classes['author-wrapper']}>
          <p className={classes['author-name']}>{username}</p>
          <p className={classes.date}>{createdAt}</p>
        </div>
        <img className={classes['author-photo']} src={image ? image : authorDummy} alt={'author-photo'} />
      </div>
    </article>
  )
}

export default ArticlePreview
