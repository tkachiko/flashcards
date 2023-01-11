import axios, { AxiosError } from 'axios'

import { loginAPI } from '../../../api/login-api'
import { ActionsType, AppThunk, LoginType, ThunkAppDispatchType } from '../../../common/types/types'
import { setDataAC } from '../../profile/profile-reducer'
import { setErrorAC } from '../register/register-reducer'

const LOGIN_SET_IS_LOGGED_IN = 'login/SET-IS-LOGGED-IN'

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state = initialState, action: ActionsType) => {
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
  (data: LoginType): ThunkAppDispatchType =>
  async (dispatch: AppThunk) => {
    try {
      const res = await loginAPI.login(data)

      dispatch(setDataAC(res.data))
      dispatch(setIsLoggedInAC(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setErrorAC(error))
      } else {
        dispatch(setErrorAC(`Native error ${err.message}`))
      }
    }
  }
