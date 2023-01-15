import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { recoveryApi } from '../../api/recoveryApi'
import { setSubmittingAC } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { SetNewPasswordType, ThunkAppDispatchType } from '../../common/types/types'
import { errorMessage } from '../../utils/error-utils'

const initialState = {
  forgotPasswordSuccess: false,
  forgetEmail: null as string | null,
  newPasswordSuccess: false,
}

const passwordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    sendPasswordAC(state, action: PayloadAction<{ forgotPass: boolean; email: string }>) {
      state.forgotPasswordSuccess = action.payload.forgotPass
      state.forgetEmail = action.payload.email
    },
    newPasswordSuccessAC(state, action: PayloadAction<{ newPasswordSuccess: boolean }>) {
      state.newPasswordSuccess = action.payload.newPasswordSuccess
    },
  },
})

export const { sendPasswordAC, newPasswordSuccessAC } = passwordSlice.actions
export const passwordReducer = passwordSlice.reducer

export const forgotPasswordTCSlice =
  (forgotPass: boolean, email: string = ''): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      await recoveryApi.forgotPassword(email)
      dispatch(sendPasswordAC({ forgotPass, email }))
    } catch (e) {
      const error = e as AxiosError<{ error: string }>

      errorMessage(dispatch, error)
    } finally {
      dispatch(setSubmittingAC({ status: 'idle' }))
    }
  }

export const createNewPasswordTC =
  (data: SetNewPasswordType): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      await recoveryApi.setNewPassword(data)
      dispatch(newPasswordSuccessAC({ newPasswordSuccess: true }))
    } catch (e) {
      const error = e as AxiosError<{ error: string }>

      errorMessage(dispatch, error)
    } finally {
      dispatch(setSubmittingAC({ status: 'idle' }))
    }
  }

export const forgotPasswordSuccessSelector = (state: RootStateType) =>
  state.password.forgotPasswordSuccess

export type PasswordRecoveryType =
  | ReturnType<typeof sendPasswordAC>
  | ReturnType<typeof newPasswordSuccessAC>
