import { Dispatch } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { LearningCardsActionsType } from '../../features/learningCards/learnCards-reducer'

import { AppActionsType } from 'app/app-reducer'
import { RootStateType } from 'app/store'
import { AuthActionType } from 'features/auth/login/auth-reducer'
import { CardsReducerType } from 'features/cards/cards-reducer'
import { CardsPacksActionType } from 'features/packs/cardsPack-reducer'
import { ProfileActionsType } from 'features/profile/profile-reducer'

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
  avatar: string
}

//Request types
export type UpdateUserType = {
  name: string
  avatar: string
}

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type SetNewPasswordType = {
  password: string
  resetPasswordToken: string
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
  avatar: string
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
export type PayloadUpdateUserType = {
  name: string
  avatar: string
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
  grade: number | null
}

export type CreateCardRequestType = {
  cardsPack_id: string | null
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
  pageCount?: number
}

export type GetCardsRequestType = {
  cardsPack_id: string | null
  question?: string
  answer?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
  cardQuestion?: string
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
  packName: string
  sortCards: string
}

export type UpdateCardRequestType = {
  _id: string
  question?: string
  answer?: string
  comment?: string
  answerImg?: string
  questionImg?: string
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
  cardsPack_id: string | null
  grade: number
  rating: number
  shots: number
  type: string
  user_id: string
  created: string
  updated: string
  __v: number
  answerImg: string
  questionImg: string
  _id: string
}
//PacksType

export type CardsPackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
  deckCover: string
}
export type GetPackSPayloadType = {
  packName?: string
  min?: number | string
  max?: number | string
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
  isMyPacks?: boolean
  deckCover?: string
}
export type GetPacksResponseType = {
  cardPacks: CardsPackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}
export type CreatePacksPayloadType = {
  cardsPack: {
    name: string
    deckCover?: string
    private?: boolean
  }
}
export type CreatePackResponseType = {
  newCardsPack: {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }
}
export type DeletePackPayloadType = {
  id: string
}
export type DeletePackResponseType = {
  deletedCardsPack: {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }
}
export type UpdatePackPayloadType = {
  cardsPack: {
    _id: string
    deckCover?: string
    cardsCount?: number
    created?: string
    grade?: number
    more_id?: string
    name?: string
    path?: string
    private?: boolean
    rating?: number
    shots?: number
    type?: string
    updated?: string
    user_id?: string
    user_name?: string
    __v?: number
  }
}
export type UpdatePackResponseType = {
  updatedCardsPack: {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }
}

//CardsType

export type CardsDataType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packUserId: string | null
  page: number
  pageCount: number
  packName: string
}

//ThunkTypes

export type ThunkAppDispatchType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  ActionsType
>
export type AppThunk = ThunkDispatch<RootStateType, unknown, ActionsType>

export type AsyncThunkConfig = {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
  pendingMeta?: unknown
  fulfilledMeta?: unknown
  rejectedMeta?: unknown
}

//Actions Types

export type ActionsType =
  | AppActionsType
  | ProfileActionsType
  | AuthActionType
  | CardsReducerType
  | CardsPacksActionType
  | LearningCardsActionsType
