const SET_ERROR = 'flashcards/register/SET_ERROR'

const initialState = {
  error: null as string | null,
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}

// actions
export const setErrorAC = (error: null | string) => ({ type: SET_ERROR, error } as const)

// types
export type ActionsType = ReturnType<typeof setErrorAC>
export type InitialStateType = typeof initialState
