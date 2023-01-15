import { ResponseType, UpdatedUserResponseType } from '../common/types/types'

import { instance } from './instance'

export const profileApi = {
  authMe() {
    return instance.post<ResponseType>('/auth/me')
  },
  changeName(name: string) {
    return instance.put<UpdatedUserResponseType>('/auth/me', { name })
  },
}
