import axios, { AxiosError } from 'axios'

import { loginAPI } from '../../../api/login-api'
import { setErrorAC, setSubmittingAC } from '../../../app/app-reducer'
import { ErrorMessage } from '../../../common/error/error404/error-utils'
import { LoginType, ThunkAppDispatchType } from '../../../common/types/types'
import { deleteUserDataAC, setDataAC } from '../../profile/profile-reducer'

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.newValue }
    default:
      return state
  }
}
//action
export const setIsLoggedInAC = (newValue: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', newValue } as const)
//thunks
export const LoginTC =
  (data: LoginType): ThunkAppDispatchType =>
  async dispatch => {
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
export const logoutTC = (): ThunkAppDispatchType => async dispatch => {
  try {
    await loginAPI.logout()
    dispatch(deleteUserDataAC())
    dispatch(setIsLoggedInAC(false))
  } catch (e) {
    const error = e as Error | AxiosError

    ErrorMessage(dispatch, { error: error.message })
  }
}

//types
type InitialStateType = typeof initialState
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
