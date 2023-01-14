import { AxiosError } from 'axios'

import { loginAPI } from '../../../api/login-api'
import { setSubmittingAC } from '../../../app/app-reducer'
import { RootStateType } from '../../../app/store'
import { LoginType, ThunkAppDispatchType } from '../../../common/types/types'
import { ErrorMessage } from '../../../utils/error-utils'
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
      const error = e as Error | AxiosError

      ErrorMessage(dispatch, error)
    }
  }
export const logoutTC = (): ThunkAppDispatchType => async dispatch => {
  try {
    await loginAPI.logout()
    dispatch(deleteUserDataAC())
    dispatch(setIsLoggedInAC(false))
  } catch (e) {
    const error = e as Error | AxiosError

    ErrorMessage(dispatch, error)
  }
}

//types
type InitialStateType = typeof initialState
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
export const isLoggedInSelector = (state: RootStateType) => state.auth.isLoggedIn
