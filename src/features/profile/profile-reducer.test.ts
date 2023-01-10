import { profileReducer, setDataAC } from './profile-reducer'

const startState = {
  profile: null,
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
    const action = setDataAC(data)

    const endState = profileReducer(startState, action)

    expect(endState.profile?._id).toBeDefined()
  })
})
