import React from 'react'

import classes from '../ArticlesList/ArticlesList.module.scss'
import Article from '../Article'
import { useAppSelector } from '../../hooks'

const ArticlesList = () => {
  const articles = useAppSelector((state) => state.articles.articles)
  return (
    <section className={classes['articles-list']}>
      {articles ? articles.map((article) => <Article key={article.slug} {...article} />) : ''}
    </section>
  )
}

export default ArticlesList
