import { ActionsType } from '../../common/types/types'

const SET_DATA_TO_PROFILE = 'profile/SET_DATA_TO_PROFILE'

export type ProfileDataType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
}

export const setDataAC = (data: ProfileDataType) => ({ type: SET_DATA_TO_PROFILE, data } as const)

const initialState = {
  profile: null as ProfileDataType | null,
}

export const profileReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_DATA_TO_PROFILE:
      return { ...state, profile: action.data }
    default:
      return state
  }
}
