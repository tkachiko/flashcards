import { instance } from './instanceAxios'

export const profileApi = {
  authMe() {
    return instance.post('/auth/me')
  },
  changeName(name: string) {
    return instance.put('/auth/me', { name })
  },
}
