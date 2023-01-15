import { LoginType, LogOutResponseType, ResponseType } from '../common/types/types'

import { instance } from './instance'

export const loginApi = {
  login(data: LoginType) {
    return instance.post<ResponseType>('auth/login', data)
  },
  logout() {
    return instance.delete<LogOutResponseType>('auth/me')
  },
}
