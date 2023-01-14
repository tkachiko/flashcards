import axios, { AxiosError } from 'axios'

import { profileApi } from '../api/profileApi'
import { ActionsType, ThunkAppDispatchType } from '../common/types/types'
import { setIsLoggedInAC } from '../features/auth/login/auth-reducer'
import { setDataAC } from '../features/profile/profile-reducer'

import { RootStateType } from './store'

export type StatusType = 'idle' | 'loading' | 'success' | 'failed'
export type InitialStateType = typeof initialState
const SET_ERROR = 'flashcards/app/SET_ERROR'
const SET_SUBMITTING = 'flashcards/app/SET_SUBMITTING'
const SET_IS_INITIALIZED = 'flashcards/app/SET_IS_INITIALIZED'

const initialState = {
  error: null as string | null,
  status: 'idle' as StatusType,
  isInitialized: false as boolean,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.error }
    case SET_SUBMITTING:
      return { ...state, status: action.status }
    case SET_IS_INITIALIZED:
      return { ...state, isInitialized: action.isInitialized }
    default:
      return state
  }
}

export const setErrorAC = (error: null | string) => ({ type: SET_ERROR, error } as const)
export const setSubmittingAC = (status: StatusType) => ({ type: SET_SUBMITTING, status } as const)
export const setAppInitializedAC = (isInitialized: boolean) =>
  ({ type: SET_IS_INITIALIZED, isInitialized } as const)

export const authMeTC = (): ThunkAppDispatchType => async dispatch => {
  dispatch(setSubmittingAC('loading'))
  try {
    const res = await profileApi.authMe()

    dispatch(setSubmittingAC('success'))
    dispatch(setDataAC(res.data))
    dispatch(setIsLoggedInAC(true))
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<{ error: string }>

      const finalError = error.response ? error.response.data.error : e.message

      dispatch(setErrorAC(finalError))
      dispatch(setSubmittingAC('failed'))
    } else {
      dispatch(setErrorAC('An unexpected error occurred'))
      dispatch(setSubmittingAC('failed'))
    }
  } finally {
    dispatch(setAppInitializedAC(true))
  }
}

export const errorSelector = (state: RootStateType) => state.app.error
export const statusSelector = (state: RootStateType) => state.app.status

export type AppActionsType =
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setSubmittingAC>
  | ReturnType<typeof setAppInitializedAC>
