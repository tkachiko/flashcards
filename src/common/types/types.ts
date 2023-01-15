import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppActionsType } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { AuthActionType } from '../../features/auth/login/auth-reducer'
import { CardsReducerType } from '../../features/cardsPacks/cards/cards-reducer'
import { PasswordRecoveryType } from '../../features/password/password-reducer'
import { ProfileActionsType } from '../../features/profile/profile-reducer'

export type StatusType = 'idle' | 'loading' | 'success' | 'failed'

export type ProfileDataType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string | Date
  updated: string | Date
  __v?: number
  token?: string
  tokenDeathTime?: number
}

//Request types

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
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
  error: string
}

export type SignUpResponseType = {
  addedUser: {}
  error?: string
}

export type GradeRequestType = {
  card_id: string
  grade: number
}

export type CreateCardRequestType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  rating?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
  type?: string
}

export type GetCardsRequestType = {
  cardsPack_id: string
  cardQuestion?: string
  cardAnswer?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type GetCardsResponseType<D> = {
  cards: D
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packUserId: string
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export type UpdateCardRequestType = {
  _id: string
  question?: string
  answer?: string
  comment?: string
}

export type UrlCardsParamsType = {
  cardsPack_id?: string
  page?: string
  pageCount?: string
  cardQuestion?: string
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  rating: number
  shots: number
  type: string
  user_id: string
  created: string
  updated: string
  __v: number
  _id: string
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
  | PasswordRecoveryType
  | CardsReducerType
