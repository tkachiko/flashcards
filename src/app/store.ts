import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { AppThunk } from '../common/types/types'
import { authReducer } from '../features/auth/login/auth-reducer'
import { passwordReducer } from '../features/password/password-reducer'
import { profileReducer } from '../features/profile/profile-reducer'

import { appReducer } from './app-reducer'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  password: passwordReducer,
  profile: profileReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type RootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppThunk>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
// @ts-ignore
window.store = store
