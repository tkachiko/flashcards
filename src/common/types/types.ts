import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { RootStateType } from '../../app/store'
import { setIsLoggedInAC } from '../../features/auth/login/auth-reducer'
import { setErrorAC, setSubmittingAC } from '../../features/auth/register/register-reducer'
import { deleteUserDataAC, setDataAC, setNewNameAC } from '../../features/profile/profile-reducer'

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LogOutResponseType = {
  info: string
  error: string
}

export type ResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  // количество колод

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}

export type ThunkAppDispatchType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  ActionsType
>
export type AppThunk = ThunkDispatch<RootStateType, unknown, ActionsType>

export type ActionsType =
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setSubmittingAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setDataAC>
  | ReturnType<typeof setNewNameAC>
  | ReturnType<typeof deleteUserDataAC>
