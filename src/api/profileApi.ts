import { instance } from './instance'

import { ResponseType, UpdatedUserResponseType, UpdateUserType } from 'common/types/types'

export const profileApi = {
  authMe() {
    return instance.post<ResponseType>('/auth/me')
  },
  changeName(params: UpdateUserType) {
    return instance.put<UpdatedUserResponseType>('/auth/me', params)
  },
}
