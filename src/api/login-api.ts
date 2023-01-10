import { instance } from './instanceAxios'
import { LoginType, ResponseType } from './types'

export const loginAPI = {
  login(data: LoginType) {
    return instance.post<ResponseType>('auth/login', data)
  },
}
