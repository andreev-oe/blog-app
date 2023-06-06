import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header'

const MainPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  )
}

export default MainPage
