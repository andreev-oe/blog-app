import React, { useEffect } from 'react'
import { Pagination } from 'antd'

import { getArticles } from '../../store/articlesSlice'
import { useAppDispatch } from '../../hooks'
import Header from '../Header'
import ArticlesList from '../ArticlesList'

import classes from './App.module.scss'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])
  return (
    <div className={classes['page-wrapper']}>
      <Header />
      <ArticlesList />
      <Pagination className={classes.pagination} />
    </div>
  )
}

export default App
