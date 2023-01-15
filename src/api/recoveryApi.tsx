import axios, { AxiosResponse } from 'axios'

export const instanceHeroku = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export type SetNewPasswordType = {
  password: string
  resetPasswordToken: string | undefined
}

export type ForgotPasswordType = {
  email: string
  message?: string
}

type ResponseForgotType = {
  info: string
  success: boolean
  answer: boolean
  html: boolean
}

export const recoveryApi = {
  forgotPassword(data: ForgotPasswordType) {
    return instanceHeroku.post<AxiosResponse<ResponseForgotType>>('auth/forgot', data)
  },
  setNewPassword(data: SetNewPasswordType) {
    return instanceHeroku.post<AxiosResponse<ResponseForgotType>>('auth/set-new-password', data)
  },
}
