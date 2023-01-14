import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { isLoggedInSelector } from '../../features/auth/login/auth-reducer'
import { useAppSelector } from '../store'

import { PATH } from './routes'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  let auth = { token: isLoggedIn }

  return auth.token ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
