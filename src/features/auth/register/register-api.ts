import { instance } from '../../../api/instanceAxios'

export const registerAPI = {
  createUser(email: string, password: string) {
    return instance.post('/auth/register', { email, password })
  },
}
