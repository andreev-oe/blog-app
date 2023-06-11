import React, { useEffect } from 'react'
import { Alert, Pagination, Spin } from 'antd'

import classes from '../ArticlesList/ArticlesList.module.scss'
import ArticlePreview from '../ArticlePreview'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { articlesSlice, getArticles } from '../../store/articlesSlice'

const ERROR_MESSAGE = 'Sorry, content not loaded, check your internet connection and try to update page'
const ARTICLES_PER_PAGE = 5

const ArticlesList = () => {
  // TODO style spinner and pagination
  const dispatch = useAppDispatch()
  const { activePage, articlesCount } = useAppSelector((state) => state.articles)
  const { setActivePage } = articlesSlice.actions
  useEffect(() => {
    dispatch(getArticles(activePage > 1 ? (activePage - 1) * ARTICLES_PER_PAGE : 0))
  }, [dispatch, activePage])
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
    <>
      <section className={classes['articles-list']}>
        {errorMessage}
        {spinner}
        {showArticles}
      </section>
      {error ? null : (
        <Pagination
          current={activePage}
          pageSize={ARTICLES_PER_PAGE}
          onChange={(page) => dispatch(setActivePage(page))}
          showSizeChanger={false}
          total={articlesCount}
          className={classes.pagination}
        />
      )}
    </>
  )
}

export default ArticlesList
