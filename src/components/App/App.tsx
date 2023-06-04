import React from 'react'
import { Pagination } from 'antd'

import Header from '../Header'
import ArticlesList from '../ArticlesList'

import classes from './App.module.scss'

function App() {
  return (
    <div className={classes['page-wrapper']}>
      <Header />
      <ArticlesList />
      <Pagination className={classes.pagination} />
    </div>
  )
}

export default App
