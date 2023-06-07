import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainPage from '../MainPage'
import ArticlesList from '../ArticlesList'
import Article from '../Article'
import SignUp from '../SignUp'
import SignIn from '../SignIn'

import classes from './App.module.scss'

function App() {
  return (
    <div className={classes['page-wrapper']}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<MainPage />}>
            <Route index element={<ArticlesList />} />
            <Route path={'articles'} element={<ArticlesList />} />
            <Route path={'articles/:slug'} element={<Article />} />
            <Route path={'sign-up'} element={<SignUp />} />
            <Route path={'sign-in'} element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
