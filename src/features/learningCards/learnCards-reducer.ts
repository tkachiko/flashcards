import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootStateType } from '../../app/store'

const initialState = {
  grade: 0 as number,
}

const slice = createSlice({
  name: 'learningCardsReducer',
  initialState,
  reducers: {
    setGradeAC(state, action: PayloadAction<{ grade: number }>) {
      state.grade = action.payload.grade
    },
  },
})

export const learningCardsReducer = slice.reducer
export const { setGradeAC } = slice.actions

export const currentGradeSelector = (state: RootStateType) => state.learningCards.grade

export type LearningCardsActionsType = ReturnType<typeof setGradeAC>
