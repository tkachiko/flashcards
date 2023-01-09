import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppErrorAC, SetAppErrorActionType } from '../../../common/error/error-reducer'

import { loginAPI, LoginType } from './login-api'

const LOGIN_SET_IS_LOGGED_IN = 'login/SET-IS-LOGGED-IN'

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.newValue }
    default:
      return state
  }
}

export const setIsLoggedInAC = (newValue: boolean) =>
  ({ type: LOGIN_SET_IS_LOGGED_IN, newValue } as const)

export const LoginTC =
  (data: LoginType) => async (dispatch: Dispatch<ActionType | SetAppErrorActionType>) => {
    try {
      const res = await loginAPI.login(data)

      dispatch(setIsLoggedInAC(true))
    } catch (e) {
      // @ts-ignore
      if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
        const error = e.response ? e.response.data.message : e.message

        dispatch(setAppErrorAC(error))
      }
    }
  }

type ActionType = ReturnType<typeof setIsLoggedInAC>
