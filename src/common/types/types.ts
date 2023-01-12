import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppActionsType } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { AuthActionType } from '../../features/auth/login/auth-reducer'
import { ProfileActionsType } from '../../features/profile/profile-reducer'

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

export type ActionsType = AppActionsType | ProfileActionsType | AuthActionType
