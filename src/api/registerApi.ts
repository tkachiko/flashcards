import { SignUpResponseType } from '../common/types/types'

import { instance } from './instanceAxios'

export const registerApi = {
  createUser(email: string, password: string) {
    return instance.post<SignUpResponseType>('/auth/register', { email, password })
  },
}
