import axios, { AxiosError } from 'axios'

import { recoveryApi } from '../../api/recoveryApi'
import { setErrorAC, setSubmittingAC } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import {
  ActionsType,
  ForgotPasswordType,
  SetNewPasswordType,
  ThunkAppDispatchType,
} from '../../common/types/types'

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

export const forgotPasswordSuccessAC = (forgotPasswordSuccess: boolean) =>
  ({
    type: 'login/SEND-FORGOT-PASSWORD',
    forgotPasswordSuccess,
  } as const)

export const newPasswordSuccess = (newPassword: boolean) =>
  ({
    type: 'login/NEW-PASSWORD-SUCCESS',
    newPassword,
  } as const)

export type ForgotPasswordActionType = ReturnType<typeof forgotPasswordSuccessAC>
export type SetDataForgetPasswordActionType = ReturnType<typeof setDataForgetPasswordAC>
export type NewPasswordSuccessActionType = ReturnType<typeof newPasswordSuccess>

export const forgotPasswordTC =
  (data: ForgotPasswordType): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC('loading'))
    try {
      await recoveryApi.forgotPassword(data)

      dispatch(setDataForgetPasswordAC(data.email))
      dispatch(forgotPasswordSuccessAC(true))
    } catch (e) {
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

export const forgotPasswordSuccessSelector = (state: RootStateType) =>
  state.password.forgotPasswordSuccess
