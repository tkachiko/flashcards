import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { LearningCards } from '../../features/learningCards/LearningCards'

import { PrivateRoutes } from './PrivateRoutes'
import { PATH } from './routes'

import { Error404 } from 'common/error/error404/Error404'
import { Login } from 'features/auth/login/Login'
import { Register } from 'features/auth/register/Register'
import { Cards } from 'features/cards/Cards'
import { CardsPack } from 'features/packs/CardsPack'
import { CheckEmail } from 'features/password/recovery/checkEmail/CheckEmail'
import { CreateNewPassword } from 'features/password/recovery/createNewPassword/CreateNewPassword'
import { ForgotPassword } from 'features/password/recovery/forgotPassword/ForgotPassword'
import { Profile } from 'features/profile/Profile'
import { TestPage } from 'features/test/testPage'

export const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={'/'} element={<CardsPack />} />
          <Route path={PATH.CARDS + '/:cardsPack_id'} element={<Cards />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.CARDS_PACKS} element={<CardsPack />} />
          <Route path={PATH.LEARNING_CARDS + '/:cardsPack_id'} element={<LearningCards />} />
        </Route>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.NOT_FOUND} element={<Error404 />} />
        <Route path={PATH.PASSWORD_RECOVERY} element={<ForgotPassword />} />
        <Route path={PATH.NEW_PASSWORD + '/:token'} element={<CreateNewPassword />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
        <Route path={PATH.TEST_PAGE} element={<TestPage />} />
        <Route path={'*'} element={<Error404 />} />
      </Routes>
    </>
  )
}
