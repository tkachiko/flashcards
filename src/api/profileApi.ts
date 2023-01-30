import { instance } from './instance'

import { ResponseType, UpdatedUserResponseType } from 'common/types/types'

export const profileApi = {
  authMe() {
    return instance.post<ResponseType>('/auth/me')
  },
  changeName(name: string, avatar: string) {
    return instance.put<UpdatedUserResponseType>('/auth/me', { name, avatar })
  },
}
