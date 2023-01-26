import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from './routes'

import { useAppSelector } from 'app/store'
import { isLoggedInSelector } from 'features/auth/login/auth-reducer'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  let auth = { token: isLoggedIn }

  return auth.token ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
