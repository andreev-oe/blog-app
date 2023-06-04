import React from 'react'

import like from '../../assets/like.png'
import authorDummy from '../../assets/author-dummy.png'

import classes from './Article.module.scss'

const Article = () => {
  return (
    <article className={classes.article}>
      <div className={classes['article-content']}>
        <div className={classes['title-wrapper']}>
          <h2 className={classes.title}>Some article title</h2>
          <img className={classes['like-icon']} src={like} alt={'likes'} />
          <span className={classes['likes-count']}>12</span>
        </div>
        <div className={classes.tags}>
          <div className={classes.tag}>Tag1</div>
          <div className={`${classes.tag} ${classes['tag__secondary']}`}>SomeTag</div>
        </div>
        <p className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <div className={classes['article-author']}>
        <div className={classes['author-wrapper']}>
          <p className={classes['author-name']}>John Doe</p>
          <p className={classes.date}>March 5, 2020 </p>
        </div>
        <img className={classes['author-photo']} src={authorDummy} alt={'author-photo'} />
      </div>
    </article>
  )
}

export default Article
