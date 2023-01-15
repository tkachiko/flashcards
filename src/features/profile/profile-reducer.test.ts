import { profileReducer, setDataAC, setNewNameAC } from './profile-reducer'

const startState = {
  profile: {
    _id: '',
    email: '',
    rememberMe: false,
    isAdmin: false,
    name: '',
    verified: false,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    __v: 0,
    token: '',
    tokenDeathTime: 0,
    avatar: null,
  },
  isLoggedIn: false,
}

describe('profile reducer', () => {
  test('should add profile data', () => {
    const data = {
      _id: 'sdgdfg435gdf',
      email: 'lala@gmail.com',
      rememberMe: false,
      isAdmin: false,
      name: 'name',
      verified: false,
      publicCardPacksCount: 0,
      created: '2023-01-08T13:23:16.238Z',
      updated: '2023-01-09T18:54:02.288Z',
      __v: 0,
      token: 'fbb0f300-904e-11ed-8e82-dfcf030a587d',
      tokenDeathTime: 1673301242288,
      avatar: null,
    }
    const action = setDataAC({ data })

    const endState = profileReducer(startState, action)

    expect(endState.profile.name).toBe('name')
  })
  test('name should be changed', () => {
    const name = 'new name'
    const action = setNewNameAC({ name })

    const endState = profileReducer(startState, action)

    expect(endState.profile.name).toBe(name)
  })
})
