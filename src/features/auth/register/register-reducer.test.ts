import { InitialStateType, registerReducer, setErrorAC } from './register-reducer'

const startState: InitialStateType = {
  error: null,
}

describe('register reducer', () => {
  test('should set error if registration failed', () => {
    const action = setErrorAC('An error has occurred')

    const endState = registerReducer(startState, action)

    expect(endState.error).toBe('An error has occurred')
  })
})
