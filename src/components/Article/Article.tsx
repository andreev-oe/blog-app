import { useParams } from 'react-router-dom'
import React, { Fragment, useEffect } from 'react'
import { Alert, Spin } from 'antd'
import Markdown from 'markdown-to-jsx'

import { getArticle } from '../../store/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import ArticlePreview from '../ArticlePreview'

const ERROR_MESSAGE = 'Sorry, content not loaded, check your internet connection and try to update page'

const Article = () => {
  // TODO style spinner
  const dispatch = useAppDispatch()
  const { slug } = useParams()
  useEffect(() => {
    if (slug) {
      dispatch(getArticle(slug))
    }
  }, [slug])
  const { article, error, loading } = useAppSelector((state) => state.articles)
  const showArticle =
    !loading && !error && article ? (
      <>
        <ArticlePreview {...article} />{' '}
        <div>
          <Markdown>{article ? article.body : ''}</Markdown>
        </div>
      </>
    ) : null
  const spinner = loading ? (
    <div className="spinner-container">
      <Spin tip="Loading article...">
        <div className="content" />
      </Spin>
    </div>
  ) : null
  const errorMessage = error ? <Alert showIcon type={'error'} message={ERROR_MESSAGE} /> : null
  return (
    <div>
      {showArticle}
      {spinner}
      {errorMessage}
    </div>
  )
}

export default Article
