import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { cardsApi } from '../../api/cards-api'
import { RootStateType } from '../../app/store'

const initialState: InitalStateType = {
  packs: {
    cardPacks: [
      {
        _id: '',
        user_id: '',
        name: '',
        cardsCount: 0,
        created: '',
        updated: '',
      },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
  },
}

const slice = createSlice({
  name: 'cardsPack',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      state.packs = action.payload
    })
  },
})

export const cardsPackReducer = slice.reducer

export const {} = slice.actions

export const fetchPacks = createAsyncThunk(
  'cardsPack/fetchPacks',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await cardsApi.getPack()

      return data
    } catch (e: any) {}
  }
)

export type InitalStateType = {
  packs?: PacksType
}
export type PacksType = {
  cardPacks: CardsPackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

type CardsPackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}
export const packSelector = (state: RootStateType): PacksType | undefined => state.pack.packs
