import axios, { AxiosError } from 'axios'

import { profileApi } from '../../api/profileApi'
import { setErrorAC, setSubmittingAC } from '../../app/app-reducer'
import { ActionsType, ThunkAppDispatchType } from '../../common/types/types'

const SET_DATA_TO_PROFILE = 'profile/SET_DATA_TO_PROFILE'
const SET_NEW_NAME = 'profile/SET_NEW_NAME'
const DELETE_USER_DATA = 'profile/DELETE_USER_DATA'

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
    case DELETE_USER_DATA:
      return initialState
    default:
      return state
  }
}

export const setDataAC = (data: ProfileDataType) => ({ type: SET_DATA_TO_PROFILE, data } as const)
export const deleteUserDataAC = () => ({ type: DELETE_USER_DATA } as const)
export const setNewNameAC = (name: string) => ({ type: SET_NEW_NAME, name } as const)

export const changeNameTC =
  (name: string): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC('loading'))
    try {
      const res = await profileApi.changeName(name)

      dispatch(setSubmittingAC('success'))
      dispatch(setNewNameAC(res.data.updatedUser.name))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<{ error: string }>

        const finalError = error.response ? error.response.data.error : e.message

        dispatch(setSubmittingAC('failed'))
        dispatch(setErrorAC(finalError))
      } else {
        dispatch(setErrorAC('An unexpected error occurred'))
      }
    }
  }

export type ProfileActionsType =
  | ReturnType<typeof setDataAC>
  | ReturnType<typeof setNewNameAC>
  | ReturnType<typeof deleteUserDataAC>
