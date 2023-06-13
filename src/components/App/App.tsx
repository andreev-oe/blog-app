import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainPage from '../MainPage'
import ArticlesList from '../ArticlesList'
import Article from '../Article'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import EditProfile from '../EditProfile'
import ArticleForm from '../ArticleForm'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import { route } from '../../constants/constants'

import classes from './App.module.scss'

function App() {
  return (
    <div className={classes['page-wrapper']}>
      <BrowserRouter>
        <Routes>
          <Route path={route.MainPage} element={<MainPage />}>
            <Route index element={<ArticlesList />} />
            <Route path={route.ArticlesList} element={<ArticlesList />} />
            <Route path={route.Article} element={<Article />} />
            <Route path={route.SignUp} element={<SignUp />} />
            <Route path={route.SignIn} element={<SignIn />} />
            <Route path={route.EditProfile} element={<EditProfile />} />
            <Route
              path={route.ArticleForm}
              element={
                <PrivateRoute>
                  <ArticleForm />
                </PrivateRoute>
              }
            />
            <Route path={route.EditArticle} element={<ArticleForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
