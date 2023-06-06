import React, { useEffect } from 'react'
import { Pagination } from 'antd'

import { articlesSlice, getArticles } from '../../store/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import Header from '../Header'
import ArticlesList from '../ArticlesList'

import classes from './App.module.scss'

const ARTICLES_PER_PAGE = 5

function App() {
  const dispatch = useAppDispatch()
  const { activePage, articlesCount } = useAppSelector((state) => state.articles)
  const { setActivePage } = articlesSlice.actions
  useEffect(() => {
    dispatch(getArticles(activePage * ARTICLES_PER_PAGE))
  }, [dispatch, activePage])
  return (
    <div className={classes['page-wrapper']}>
      <Header />
      <ArticlesList />
      <Pagination
        current={activePage}
        pageSize={ARTICLES_PER_PAGE}
        onChange={(page) => dispatch(setActivePage(page))}
        showSizeChanger={false}
        total={articlesCount}
        className={classes.pagination}
      />
    </div>
  )
}

export default App
