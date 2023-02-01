import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { profileApi } from 'api/profileApi'
import { setSubmittingAC } from 'app/app-reducer'
import { RootStateType } from 'app/store'
import {
  AsyncThunkConfig,
  ProfileDataType,
  UpdatedUserResponseType,
  UpdateUserType,
} from 'common/types/types'
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
  },
  extraReducers: builder => {
    builder.addCase(changeNameAndAvatarTC.fulfilled, (state, action) => {
      state.profile.name = action.payload.data.updatedUser.name
      state.profile.avatar = action.payload.data.updatedUser.avatar

      return state
    })
  },
})

export const profileReducer = slice.reducer
export const { setDataAC, deleteUserDataAC } = slice.actions
export const changeNameAndAvatarTC = createAsyncThunk<
  { data: UpdatedUserResponseType },
  UpdateUserType,
  AsyncThunkConfig
>('profile/changeNameAva', async (params, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const res = await profileApi.changeName(params)

    dispatch(setSubmittingAC({ status: 'success' }))

    return { data: res.data }
  } catch (e) {
    const error = e as Error | AxiosError

    return rejectWithValue(errorMessage(dispatch, error))
  }
})
export type ProfileActionsType = ReturnType<typeof setDataAC> | ReturnType<typeof deleteUserDataAC>

export const nameSelector = (state: RootStateType) => state.profile.profile.name
export const emailSelector = (state: RootStateType) => state.profile.profile.email
export const userIdSelector = (state: RootStateType) => state.profile.profile._id
export const avatarSelector = (state: RootStateType) => state.profile.profile.avatar
