import { instance } from '../../../api/recoveryApi'

export const registerAPI = {
  createUser(email: string, password: string) {
    return instance.post('/auth/register', { email, password })
  },
}
