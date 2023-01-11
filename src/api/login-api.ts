import { LoginType, ResponseType } from '../common/types/types'

import { instance } from './instanceAxios'

export const loginAPI = {
  login(data: LoginType) {
    return instance.post<ResponseType>('auth/login', data)
  },
}
