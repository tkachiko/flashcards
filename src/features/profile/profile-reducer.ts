import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { profileApi } from 'api/profileApi'
import { setSubmittingAC } from 'app/app-reducer'
import { RootStateType } from 'app/store'
import { ProfileDataType, ThunkAppDispatchType } from 'common/types/types'
import { errorMessage } from 'utils/error-utils'

const initialState = {
  profile: {
    _id: '',
    email: '',
    rememberMe: false,
    isAdmin: false,
    name: '',
    verified: false,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    __v: 0,
    token: '',
    tokenDeathTime: 0,
    avatar: '',
  } as ProfileDataType,
}

const slice = createSlice({
  name: 'profileReducer',
  initialState,
  reducers: {
    setDataAC(state, action: PayloadAction<{ data: ProfileDataType }>) {
      state.profile = action.payload.data
    },
    deleteUserDataAC(state) {
      state = initialState
    },
    setNewNameAC(state, action: PayloadAction<{ name: string }>) {
      state.profile.name = action.payload.name
    },
    setNewAvaAC(state, action: PayloadAction<{ avatar: string }>) {
      state.profile.avatar = action.payload.avatar
    },
  },
})

export const profileReducer = slice.reducer
export const { setDataAC, deleteUserDataAC, setNewNameAC, setNewAvaAC } = slice.actions

export const changeNameTC =
  (name: string, avatar: string): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      const res = await profileApi.changeName(name, avatar)

      dispatch(setSubmittingAC({ status: 'success' }))
      dispatch(setNewAvaAC({ avatar: res.data.updatedUser.avatar }))
      dispatch(setNewNameAC({ name: res.data.updatedUser.name }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<{ error: string }>

        errorMessage(dispatch, error)
      }
    }
  }

export type ProfileActionsType =
  | ReturnType<typeof setDataAC>
  | ReturnType<typeof setNewNameAC>
  | ReturnType<typeof deleteUserDataAC>
  | ReturnType<typeof setNewAvaAC>

export const nameSelector = (state: RootStateType) => state.profile.profile.name
export const emailSelector = (state: RootStateType) => state.profile.profile.email
export const userIdSelector = (state: RootStateType) => state.profile.profile._id
export const avatarSelector = (state: RootStateType) => state.profile.profile.avatar
