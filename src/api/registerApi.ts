import { instance } from './instanceAxios'

export const registerApi = {
  createUser(email: string, password: string) {
    return instance.post('/auth/register', { email, password })
  },
}
