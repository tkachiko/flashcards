import React from 'react'

import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { Error404 } from '../../common/error/error404/Error404'
import { isLoggedInSelector } from '../../features/auth/login/auth-reducer'
import { Login } from '../../features/auth/login/Login'
import { Register } from '../../features/auth/register/Register'
import { CheckEmail } from '../../features/password/recovery/checkEmail/CheckEmail'
import { CreateNewPassword } from '../../features/password/recovery/createNewPassword/CreateNewPassword'
import { ForgotPassword } from '../../features/password/recovery/forgotPassword/ForgotPassword'
import { Profile } from '../../features/profile/Profile'
import { TestPage } from '../../features/test/testPage'
import { useAppSelector } from '../store'

import { PATH } from './routes'

const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)
  const auth = { token: isLoggedIn }

  return auth.token ? <Outlet /> : <Navigate to="/login" />
}

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.MAIN} element={<Navigate to={PATH.PROFILE} />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
      </Route>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.NOT_FOUND} element={<Error404 />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<ForgotPassword />} />
      <Route path={PATH.NEW_PASSWORD} element={<CreateNewPassword />} />
      <Route path={PATH.TEST_PAGE} element={<TestPage />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
    </Routes>
  )
}
