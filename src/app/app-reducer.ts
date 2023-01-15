import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { profileApi } from '../api/profileApi'
import { StatusType, ThunkAppDispatchType } from '../common/types/types'
import { setIsLoggedInAC } from '../features/auth/login/auth-reducer'
import { setDataAC } from '../features/profile/profile-reducer'

import { RootStateType } from './store'

export type InitialStateType = typeof initialState

const initialState = {
  error: null as string | null,
  status: 'idle' as StatusType,
  isInitialized: false as boolean,
}

const slice = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setSubmittingAC(state, action: PayloadAction<{ status: StatusType }>) {
      state.status = action.payload.status
    },
    setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const { setErrorAC, setSubmittingAC, setAppInitializedAC } = slice.actions

export const authMeTC = (): ThunkAppDispatchType => async dispatch => {
  dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const res = await profileApi.authMe()

    dispatch(setSubmittingAC({ status: 'success' }))

    dispatch(setDataAC({ data: res.data }))
    dispatch(setIsLoggedInAC({ newValue: true }))
  } catch (e) {
    dispatch(setSubmittingAC({ status: 'failed' }))
    console.warn(e)
  } finally {
    dispatch(setAppInitializedAC({ isInitialized: true }))
  }
}

export const appErrorSelector = (state: RootStateType) => state.app.error
export const appStatusSelector = (state: RootStateType) => state.app.status
export const appIsInitializedSelector = (state: RootStateType) => state.app.isInitialized

export type AppActionsType =
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setSubmittingAC>
  | ReturnType<typeof setAppInitializedAC>
