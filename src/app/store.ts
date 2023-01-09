import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { ErrorReducer } from '../common/error/error-reducer'
import { authReducer } from '../features/auth/login/auth-reducer'
import { ActionsType, registerReducer } from '../features/auth/register/register-reducer'
import { passwordReducer } from '../features/password/password-reducer'
import { profileReducer } from '../features/profile/profile-reducer'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  password: passwordReducer,
  profile: profileReducer,
  error: ErrorReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type RootStateType = ReturnType<typeof rootReducer>

export type ThunkAppDispatchType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  ActionsType
>
export type AppThunk = ThunkDispatch<RootStateType, unknown, ActionsType>

export const useAppDispatch = () => useDispatch<AppThunk>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
// @ts-ignore
window.store = store
