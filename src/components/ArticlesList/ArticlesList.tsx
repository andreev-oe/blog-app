import React from 'react'
import { Alert, Spin } from 'antd'

import classes from '../ArticlesList/ArticlesList.module.scss'
import ArticlePreview from '../ArticlePreview'
import { useAppSelector } from '../../hooks'

const ERROR_MESSAGE = 'Sorry, content not loaded, check your internet connection and try to update page'

const ArticlesList = () => {
  // TODO style spinner
  const { articles, error, loading } = useAppSelector((state) => state.articles)
  const showArticles =
    !loading && !error && articles
      ? articles.map((article) => <ArticlePreview key={article.slug} {...article} />)
      : null
  const spinner = loading ? (
    <div className="spinner-container">
      <Spin tip="Loading articles...">
        <div className="content" />
      </Spin>
    </div>
  ) : null
  const errorMessage = error ? <Alert showIcon type={'error'} message={ERROR_MESSAGE} /> : null
  return (
    <section className={classes['articles-list']}>
      {errorMessage}
      {spinner}
      {showArticles}
    </section>
  )
}

export default ArticlesList
