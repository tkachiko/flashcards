import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { recoveryApi, SetNewPasswordType } from '../../api/recoveryApi'
import { setErrorAC, setSubmittingAC } from '../../app/app-reducer'
import { ThunkAppDispatchType } from '../../common/types/types'

const initialState = {
  forgotPasswordSuccess: false,
  forgetEmail: null as string | null,
  newPasswordSuccess: false,
}

const passwordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    sendPasswordAC(state, action: PayloadAction<{ data: boolean; email: string }>) {
      state.forgotPasswordSuccess = action.payload.data
      state.forgetEmail = action.payload.email
    },
    newPasswordSuccessAC() {},
  },
})

export type SendPasswordType = ReturnType<typeof sendPasswordAC>

export const { sendPasswordAC, newPasswordSuccessAC } = passwordSlice.actions
export const passwordReducer = passwordSlice.reducer

export const forgotPasswordTCSlice =
  (forgotPass: boolean, email: string): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC('loading'))
    try {
      await recoveryApi.forgotPassword({ email })
      dispatch(sendPasswordAC({ data: forgotPass, email }))
    } catch (e) {
      // ErrorMessage(dispatch, { error: error.message })
      const err = e as Error | AxiosError

      // if (axios.isAxiosError(err)) {
      //   const error = err.response?.data
      //     ? (err.response.data as { error: string }).error
      //     : err.message
      //
      //   dispatch(setErrorAC(error))
      // } else {
      //   dispatch(setErrorAC(`Native error ${err.message}`))
      // }
    } finally {
      dispatch(setSubmittingAC('idle'))
    }
  }

export const createNewPasswordTC =
  (data: SetNewPasswordType): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC('loading'))
    try {
      await recoveryApi.setNewPassword(data)
      // dispatch(newPasswordSuccess(true))
    } catch (e) {
      const err = e as Error | AxiosError

      if (axios.isAxiosError(err)) {
        const error = err.response?.data
          ? (err.response.data as { error: string }).error
          : err.message

        dispatch(setErrorAC(error))
      }
    } finally {
      dispatch(setSubmittingAC('idle'))
    }
  }

export const forgotPasswordSuccessSelector = (state: RootStateType) =>
  state.password.forgotPasswordSuccess
