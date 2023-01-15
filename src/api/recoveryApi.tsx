import axios from 'axios'

import { ForgotPasswordType, ResponseForgotType, SetNewPasswordType } from '../common/types/types'

export const instanceHeroku = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const recoveryApi = {
  forgotPassword(data: ForgotPasswordType) {
    return instanceHeroku.post<AxiosResponse<ResponseForgotType>>('auth/forgot', data)
  },
  setNewPassword(data: SetNewPasswordType) {
    return instanceHeroku.post<AxiosResponse<ResponseForgotType>>('auth/set-new-password', data)
  },
}
