import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { loginAPI } from '../../../api/login-api'
import { setErrorAC, setSubmittingAC } from '../../../app/app-reducer'
import { LoginType } from '../../../common/types/types'
import { deleteUserDataAC, setDataAC } from '../../profile/profile-reducer'

const LOGIN_SET_IS_LOGGED_IN = 'login/SET-IS-LOGGED-IN'

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case LOGIN_SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.newValue }
    default:
      return state
  }
}

export const setIsLoggedInAC = (newValue: boolean) =>
  ({ type: LOGIN_SET_IS_LOGGED_IN, newValue } as const)

export const LoginTC = (data: LoginType) => async (dispatch: Dispatch) => {
  dispatch(setSubmittingAC('loading'))
  try {
    const res = await loginAPI.login(data)

    dispatch(setDataAC(res.data))
    dispatch(setSubmittingAC('success'))
    dispatch(setIsLoggedInAC(true))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setSubmittingAC('failed'))
      dispatch(setErrorAC(error))
    } else {
      dispatch(setSubmittingAC('failed'))
      dispatch(setErrorAC(`Native error ${err.message}`))
    }
  }
}

export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
export const logoutTC = (): ThunkAppDispatchType => async (dispatch: AppThunk) => {
  try {
    const res = await loginAPI.logout()

    console.log(res.data.info)
    dispatch(deleteUserDataAC())
    dispatch(setIsLoggedInAC(false))
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
