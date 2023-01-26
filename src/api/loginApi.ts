import { instance } from './instance'

import { LoginType, LogOutResponseType, ResponseType } from 'common/types/types'

export const loginApi = {
  login(data: LoginType) {
    return instance.post<ResponseType>('auth/login', data)
  },
  logout() {
    return instance.delete<LogOutResponseType>('auth/me')
  },
}
