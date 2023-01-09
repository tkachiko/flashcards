import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { registerApi } from '../../../api/registerApi'
import { RootStateType } from '../../../app/store'

const SET_ERROR = 'flashcards/register/SET_ERROR'
const SET_SUBMITTING = 'flashcards/register/SET_SUBMITTING'

const initialState = {
  error: null as string | null,
  status: 'idle' as StatusType,
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.error }
    case SET_SUBMITTING:
      return { ...state, status: action.status }
    default:
      return state
  }
}

// actions
export const setErrorAC = (error: null | string) => ({ type: SET_ERROR, error } as const)
export const setSubmittingAC = (status: StatusType) => ({ type: SET_SUBMITTING, status } as const)

// thunks
export const createUserTC =
  (email: string, password: string): ThunkAppDispatchType =>
  async (dispatch: Dispatch) => {
    dispatch(setSubmittingAC('loading'))
    try {
      await registerApi.createUser(email, password)
      dispatch(setSubmittingAC('success'))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<{ error: string }>

        const finalError = error.response ? error.response.data.error : e.message

        dispatch(setErrorAC(finalError))
        dispatch(setSubmittingAC('failed'))
      } else {
        dispatch(setSubmittingAC('failed'))
        dispatch(setErrorAC('An unexpected error occurred'))
      }
    }
  }

// types
export type ActionsType = ReturnType<typeof setErrorAC> | ReturnType<typeof setSubmittingAC>
export type InitialStateType = typeof initialState

export type ThunkAppDispatchType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  ActionsType
>
export type AppThunk = ThunkDispatch<RootStateType, unknown, ActionsType>
export type StatusType = 'idle' | 'loading' | 'success' | 'failed'
