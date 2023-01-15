import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { loginApi } from '../../../api/loginApi'
import { setSubmittingAC } from '../../../app/app-reducer'
import { RootStateType } from '../../../app/store'
import { LoginType, ThunkAppDispatchType } from '../../../common/types/types'
import { errorMessage } from '../../../utils/error-utils'
import { deleteUserDataAC, setDataAC } from '../../profile/profile-reducer'

const initialState = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ newValue: boolean }>) {
      state.isLoggedIn = action.payload.newValue
    },
  },
})

export const authReducer = slice.reducer
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC

//thunks
export const LoginTC =
  (data: LoginType): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      const res = await loginApi.login(data)

      dispatch(setDataAC({ data: res.data }))
      dispatch(setSubmittingAC({ status: 'success' }))
      dispatch(setIsLoggedInAC({ newValue: true }))
    } catch (e) {
      const error = e as Error | AxiosError

      errorMessage(dispatch, error)
    }
  }
export const logoutTC = (): ThunkAppDispatchType => async dispatch => {
  try {
    await loginApi.logout()
    dispatch(deleteUserDataAC())
    dispatch(setIsLoggedInAC({ newValue: false }))
  } catch (e) {
    const error = e as Error | AxiosError

    errorMessage(dispatch, error)
  }
}

//types
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
export const isLoggedInSelector = (state: RootStateType) => state.auth.isLoggedIn
