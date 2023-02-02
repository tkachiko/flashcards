import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { loginApi } from 'api/loginApi'
import { setSubmittingAC } from 'app/app-reducer'
import { RootStateType } from 'app/store'
import {
  AsyncThunkConfig,
  LoginType,
  LogOutResponseType,
  ResponseType,
  ThunkAppDispatchType,
} from 'common/types/types'
import { deleteUserDataAC, setDataAC } from 'features/profile/profile-reducer'
import { errorMessage } from 'utils/error-utils'

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
export const LoginTC = createAsyncThunk<{ data: ResponseType }, LoginType, AsyncThunkConfig>(
  'auth/login',
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      const res = await loginApi.login(params)

      dispatch(setSubmittingAC({ status: 'success' }))
      dispatch(setIsLoggedInAC({ newValue: true }))

      return { data: res.data }
    } catch (e) {
      const error = e as Error | AxiosError

      return rejectWithValue(errorMessage(dispatch, error))
    }
  }
)

export const logoutTC = createAsyncThunk<{ data: LogOutResponseType }, AsyncThunkConfig>(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      const res = await loginApi.logout()

      dispatch(setIsLoggedInAC({ newValue: false }))
      dispatch(setSubmittingAC({ status: 'success' }))

      return { data: res.data }
    } catch (e) {
      const error = e as Error | AxiosError

      return rejectWithValue(errorMessage(dispatch, error))
    }
  }
)

//types
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
export const isLoggedInSelector = (state: RootStateType) => state.auth.isLoggedIn
