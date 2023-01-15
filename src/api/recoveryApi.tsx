import axios, { AxiosResponse } from 'axios'

import { ResponseForgotType, SetNewPasswordType } from '../common/types/types'

export const instanceHeroku = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const recoveryApi = {
  forgotPassword(email: string) {
    return instanceHeroku.post<AxiosResponse<ResponseForgotType>>('auth/forgot', { email })
  },
  setNewPassword(data: SetNewPasswordType) {
    return instanceHeroku.post<AxiosResponse<ResponseForgotType>>('auth/set-new-password', data)
  },
}
