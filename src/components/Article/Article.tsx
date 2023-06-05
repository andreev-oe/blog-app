import React from 'react'

import like from '../../assets/like.png'
import authorDummy from '../../assets/author-dummy.png'
import { IArticle } from '../../types'

import classes from './Article.module.scss'

const Article = ({ title, favoritesCount, tagList, description, createdAt, author }: IArticle) => {
  const { username, image } = author
  // TODO add secondary tag styles
  return (
    <article className={classes.article}>
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
  )
}

export default Article
