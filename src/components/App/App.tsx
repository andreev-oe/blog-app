import React, { useEffect } from 'react'
import { Pagination } from 'antd'

import { getArticles } from '../../store/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import Header from '../Header'
import ArticlesList from '../ArticlesList'

import classes from './App.module.scss'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])
  const articlesCount = useAppSelector((state) => state.articles.articlesCount)
  return (
    <div className={classes['page-wrapper']}>
      <Header />
      <ArticlesList />
      <Pagination total={articlesCount / 5} className={classes.pagination} />
    </div>
  )
}

export default App
