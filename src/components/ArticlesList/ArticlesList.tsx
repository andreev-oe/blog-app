import React from 'react'

import classes from '../ArticlesList/ArticlesList.module.scss'
import Article from '../Article'

const ArticlesList = () => {
  return (
    <section className={classes['articles-list']}>
      <Article />
    </section>
  )
}

export default ArticlesList
