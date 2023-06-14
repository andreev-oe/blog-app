import React from 'react'
import { Link } from 'react-router-dom'

import classes from '../NotFoundPage/NotFoundPage.module.scss'
import { route } from '../../constants/constants'

const NotFoundPage = () => {
  return (
    <article className={classes.article}>
      Page not found. Go back to <Link to={route.MainPage}>main page</Link>
    </article>
  )
}

export default NotFoundPage
