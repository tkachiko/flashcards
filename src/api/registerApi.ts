import { instance } from './instance'

import { SignUpResponseType } from 'common/types/types'

export const registerApi = {
  createUser(email: string, password: string) {
    return instance.post<SignUpResponseType>('/auth/register', { email, password })
  },
}
