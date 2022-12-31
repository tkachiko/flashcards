import {Navigate, Route, Routes} from 'react-router-dom'
import {PATH} from './routes'
import {Login} from '../../../features/auth/login/Login'
import {Register} from '../../../features/auth/register/Register'
import {Profile} from '../profile/Profile'
import {NonFound} from '../error/404/NonFound'
import {PasswordRecovery} from '../../../features/password/recovery/PasswordRecovery'
import {NewPassword} from '../../../features/password/new/NewPassword'
import {TestPage} from '../../../features/test/testPage'
import React from 'react'

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={PATH.MAIN} element={<Navigate to={PATH.PROFILE} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.NOT_FOUND} element={<NonFound />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.TEST_PAGE} element={<TestPage />} />
    </Routes>
  )
}