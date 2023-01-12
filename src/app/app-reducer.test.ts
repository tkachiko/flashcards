import {
  appReducer,
  InitialStateType,
  setAppInitializedAC,
  setErrorAC,
  setSubmittingAC,
} from './app-reducer'

const startState: InitialStateType = {
  error: null,
  status: 'idle',
  isInitialized: false,
}

describe('app reducer', () => {
  test('should set error if something failed', () => {
    const action = setErrorAC('An error has occurred')

    const endState = appReducer(startState, action)

    expect(endState.error).toBe('An error has occurred')
  })
  test('should be submitted loading for a while', () => {
    const action = setSubmittingAC('loading')

    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading')
  })
  test('initializing app', () => {
    const action = setAppInitializedAC(true)

    const endState = appReducer(startState, action)

    expect(endState.isInitialized).toBe(true)
  })
})
