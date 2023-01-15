import { SignUpResponseType } from '../common/types/types'

import { instance } from './instance'

export const registerApi = {
  createUser(email: string, password: string) {
    return instance.post<SignUpResponseType>('/auth/register', { email, password })
  },
}
