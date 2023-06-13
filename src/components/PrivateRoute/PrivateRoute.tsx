import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../hooks'
import { route, USER } from '../../constants/constants'

type PrivateRouteProps = {
  children: React.JSX.Element
}
function PrivateRoute({ children }: PrivateRouteProps): React.JSX.Element {
  const user = useAppSelector((state) => state.user.user)
  const userInInLocalStorage = JSON.parse(localStorage.getItem(USER) || '""')

  return userInInLocalStorage.username || user.username ? children : <Navigate to={route.MainPage} />
}

export default PrivateRoute
