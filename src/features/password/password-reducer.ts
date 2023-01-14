import axios, { AxiosError } from 'axios'

import { ForgotPasswordType, recoveryApi, SetNewPasswordType } from '../../api/recoveryApi'
import { setErrorAC, setSubmittingAC } from '../../app/app-reducer'
import { ActionsType, ThunkAppDispatchType } from '../../common/types/types'
import { ErrorMessage } from '../../utils/error-utils'

const initialState = {
  forgotPasswordSuccess: false,
  forgetEmail: null as string | null,
  newPasswordSuccess: false,
}

export const passwordReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'login/SEND-FORGOT-PASSWORD':
      return { ...state, forgotPasswordSuccess: action.forgotPasswordSuccess }
    case 'login/NEW-PASSWORD-SUCCESS':
      return { ...state, newPasswordSuccess: action.newPassword }
    case 'login/SET-DATA-EMAIL':
      return { ...state, forgetEmail: action.email }
    default:
      return state
  }
}

export const setDataForgetPasswordAC = (email: string) =>
  ({ type: 'login/SET-DATA-EMAIL', email } as const)

export const forgotPasswordSuccess = (forgotPasswordSuccess: boolean) =>
  ({
    type: 'login/SEND-FORGOT-PASSWORD',
    forgotPasswordSuccess,
  } as const)

export const newPasswordSuccess = (newPassword: boolean) =>
  ({
    type: 'login/NEW-PASSWORD-SUCCESS',
    newPassword,
  } as const)

export type ForgotPasswordActionType = ReturnType<typeof forgotPasswordSuccess>
export type SetDataForgetPasswordActionType = ReturnType<typeof setDataForgetPasswordAC>
export type NewPasswordSuccessActionType = ReturnType<typeof newPasswordSuccess>

export const forgotPasswordTC =
  (data: ForgotPasswordType): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC('loading'))
    try {
      await recoveryApi.forgotPassword(data)
      dispatch(setDataForgetPasswordAC(data.email))
      dispatch(forgotPasswordSuccess(true))
    } catch (e) {
      // ErrorMessage(dispatch, { error: error.message })
      const err = e as Error | AxiosError

      if (axios.isAxiosError(err)) {
        const error = err.response?.data
          ? (err.response.data as { error: string }).error
          : err.message

        dispatch(setErrorAC(error))
      } else {
        dispatch(setErrorAC(`Native error ${err.message}`))
      }
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
      dispatch(newPasswordSuccess(true))
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
