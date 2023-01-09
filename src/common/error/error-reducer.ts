const initialState: initialStateType = {
  error: null,
}

export const ErrorReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'ERROR/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return { ...state }
  }
}

export const setAppErrorAC = (error: string | null) => ({ type: 'ERROR/SET-ERROR', error } as const)

type initialStateType = {
  error: string | null
}

type ActionType = SetAppErrorActionType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
