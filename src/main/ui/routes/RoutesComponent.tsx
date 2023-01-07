import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from '../../../features/auth/login/Login'
import { Register } from '../../../features/auth/register/Register'
import { NewPassword } from '../../../features/password/new/NewPassword'
import { CheckEmail } from '../../../features/password/recovery/check/CheckEmail'
import { PasswordRecovery } from '../../../features/password/recovery/PasswordRecovery'
import { TestPage } from '../../../features/test/testPage'
import { Error404 } from '../error/error404/Error404'
import { Profile } from '../profile/Profile'

import { PATH } from './routes'

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={PATH.MAIN} element={<Navigate to={PATH.PROFILE} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.NOT_FOUND} element={<Error404 />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.TEST_PAGE} element={<TestPage />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
    </Routes>
  )
}
