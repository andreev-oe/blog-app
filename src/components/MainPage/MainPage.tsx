import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Pagination } from 'antd'

import Header from '../Header'
import classes from '../App/App.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { articlesSlice, getArticles } from '../../store/articlesSlice'
const ARTICLES_PER_PAGE = 5

const MainPage = () => {
  // TODO hide pagination then article is open
  const dispatch = useAppDispatch()
  const { activePage, articlesCount, loading, error } = useAppSelector((state) => state.articles)
  const { setActivePage } = articlesSlice.actions
  useEffect(() => {
    dispatch(getArticles(activePage * ARTICLES_PER_PAGE))
  }, [dispatch, activePage])
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      {loading || error ? null : (
        <Pagination
          current={activePage}
          pageSize={ARTICLES_PER_PAGE}
          onChange={(page) => dispatch(setActivePage(page))}
          showSizeChanger={false}
          total={articlesCount}
          className={classes.pagination}
        />
      )}
    </React.Fragment>
  )
}

export default MainPage
