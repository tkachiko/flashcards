import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { profileApi } from '../../api/profileApi'
import { ActionsType, ThunkAppDispatchType } from '../../common/types/types'
import { setIsLoggedInAC } from '../auth/login/auth-reducer'
import { setErrorAC } from '../auth/register/register-reducer'

const SET_DATA_TO_PROFILE = 'profile/SET_DATA_TO_PROFILE'
const SET_NEW_NAME = 'profile/SET_NEW_NAME'

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

const initialState = {
  profile: {
    _id: '',
    email: '',
    rememberMe: false,
    isAdmin: false,
    name: '',
    verified: false,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    __v: 0,
    token: '',
    tokenDeathTime: 0,
    avatar: null,
  } as ProfileDataType,
}

export const profileReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_DATA_TO_PROFILE:
      return { ...state, profile: action.data }
    case SET_NEW_NAME:
      return { ...state, profile: { ...state.profile, name: action.name } }
    default:
      return state
  }
}

export const setDataAC = (data: ProfileDataType) => ({ type: SET_DATA_TO_PROFILE, data } as const)
export const setNewNameAC = (name: string) => ({ type: SET_NEW_NAME, name } as const)
// export type ActionsType = ReturnType<typeof setDataAC> | ReturnType<typeof setNewNameAC>

export const authMeTC = (): ThunkAppDispatchType => async (dispatch: Dispatch<ActionsType>) => {
  try {
    const res = await profileApi.authMe()

    dispatch(setDataAC(res.data))
    dispatch(setIsLoggedInAC(true))
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<{ error: string }>

      const finalError = error.response ? error.response.data.error : e.message

      dispatch(setErrorAC(finalError))
    } else {
      dispatch(setErrorAC('An unexpected error occurred'))
    }
  }
}

export const changeNameTC =
  (name: string): ThunkAppDispatchType =>
  async (dispatch: Dispatch<ActionsType>) => {
    try {
      const res = await profileApi.changeName(name)

      dispatch(setNewNameAC(res.data.updatedUser.name))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<{ error: string }>

        const finalError = error.response ? error.response.data.error : e.message

        dispatch(setErrorAC(finalError))
      } else {
        dispatch(setErrorAC('An unexpected error occurred'))
      }
    }
  }
