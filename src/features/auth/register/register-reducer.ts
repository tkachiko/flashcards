import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { RootStateType } from '../../../app/store'

import { registerAPI } from './register-api'

const SET_ERROR = 'flashcards/register/SET_ERROR'

const initialState = {
  error: null as string | null,
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}

// actions
export const setErrorAC = (error: null | string) => ({ type: SET_ERROR, error } as const)

// thunks
export const createUserTC =
  (email: string, password: string): ThunkAppDispatchType =>
  async (dispatch: Dispatch) => {
    try {
      await registerAPI.createUser(email, password)
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

// types
export type ActionsType = ReturnType<typeof setErrorAC>
export type InitialStateType = typeof initialState

export type ThunkAppDispatchType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  ActionsType
>
export type AppThunk = ThunkDispatch<RootStateType, unknown, ActionsType>
