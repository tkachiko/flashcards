import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppActionsType } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { AuthActionType } from '../../features/auth/login/auth-reducer'
import {
  ForgotPasswordActionType,
  NewPasswordSuccessActionType,
  SetDataForgetPasswordActionType,
} from '../../features/password/password-reducer'
import { ProfileActionsType } from '../../features/profile/profile-reducer'

//Request types

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ForgotPasswordType = {
  email: string
  message: string
}

export type SetNewPasswordType = {
  password: string
  resetPasswordToken: string | undefined
}

//Response Types

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
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}

export type UpdatedUserResponseType = {
  updatedUser: ResponseType
}

export type ResponseForgotType = {
  info: string
  success: boolean
  answer: boolean
  html: boolean
}

export type SignUpResponseType = {
  addedUser: {}
  error?: string
}

//ThunkTypes

export type ThunkAppDispatchType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  ActionsType
>
export type AppThunk = ThunkDispatch<RootStateType, unknown, ActionsType>

//Actions Types

export type ActionsType =
  | AppActionsType
  | ProfileActionsType
  | AuthActionType
  | ForgotPasswordActionType
  | SetDataForgetPasswordActionType
  | NewPasswordSuccessActionType
