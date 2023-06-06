import React from 'react'
import { Link } from 'react-router-dom'

import like from '../../assets/like.png'
import authorDummy from '../../assets/author-dummy.png'
import { IArticle } from '../../types'
import { articlesSlice } from '../../store/articlesSlice'
import { useAppDispatch } from '../../hooks'

import classes from './ArticlePreview.module.scss'

const ArticlePreview = ({ title, favoritesCount, tagList, description, createdAt, author, slug }: IArticle) => {
  const { username, image } = author
  const dispatch = useAppDispatch()
  const { setActiveArticleSlug } = articlesSlice.actions
  // TODO add secondary tag styles
  return (
    <Link to={`/articles/${slug}`} className={classes.link}>
      <article onClick={() => dispatch(setActiveArticleSlug(slug))} className={classes.article}>
        <div className={classes['article-content']}>
          <div className={classes['title-wrapper']}>
            <h2 className={classes.title}>{title}</h2>
            <img className={classes['like-icon']} src={like} alt={'likes'} />
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
    </Link>
  )
}

export default ArticlePreview
