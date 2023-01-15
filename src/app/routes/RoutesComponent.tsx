import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { Error404 } from '../../common/error/error404/Error404'
import { Login } from '../../features/auth/login/Login'
import { Register } from '../../features/auth/register/Register'
import { CardsPack } from '../../features/decks/CardsPack'
import { CheckEmail } from '../../features/password/recovery/checkEmail/CheckEmail'
import { CreateNewPassword } from '../../features/password/recovery/createNewPassword/CreateNewPassword'
import { ForgotPassword } from '../../features/password/recovery/forgotPassword/ForgotPassword'
import { Profile } from '../../features/profile/Profile'
import { TestPage } from '../../features/test/testPage'

import { PrivateRoutes } from './PrivateRoutes'
import { PATH } from './routes'

export const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={'/'} element={<Profile />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
        </Route>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.NOT_FOUND} element={<Error404 />} />
        <Route path={PATH.PASSWORD_RECOVERY} element={<ForgotPassword />} />
        <Route path={PATH.NEW_PASSWORD} element={<CreateNewPassword />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
        <Route path={PATH.TEST_PAGE} element={<TestPage />} />
        <Route path={PATH.CARDS_PACK} element={<CardsPack />} />
        <Route path={'*'} element={<Error404 />} />
      </Routes>
    </>
  )
}
