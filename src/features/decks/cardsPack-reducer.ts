import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

import { cardsApi } from '../../api/cards-api'
import { RootStateType } from '../../app/store'

const slice = createSlice({
  name: 'cardsPack',
  initialState: {
    cardPacks: [
      {
        _id: '' as string,
        user_id: '' as string,
        name: '' as string,
        cardsCount: 0 as number,
        created: '' as string,
        updated: '' as string,
      },
    ],
    cardPacksTotalCount: 0 as number,
    maxCardsCount: 0 as number,
    minCardsCount: 0 as number,
    page: 1 as number,
    pageCount: 10 as number,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      if (action.payload) {
        state.cardPacks = action.payload.data.cardPacks
      }
    })
  },
})

export const cardsPackReducer = slice.reducer

export const {} = slice.actions
type AsyncThunkConfig = {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
  pendingMeta?: unknown
  fulfilledMeta?: unknown
  rejectedMeta?: unknown
}

export const addPackTC = createAsyncThunk<{}, string, AsyncThunkConfig>(
  'cardsPack/addPacks',
  async (name: string, thunkAPI) => {
    try {
      const response = await cardsApi.createPack(name)

      thunkAPI.dispatch(fetchPacks())

      return { data: response.data }
    } catch (e: any) {
      return thunkAPI.rejectWithValue('')
    }
  }
)
export const fetchPacks = createAsyncThunk(
  'cardsPack/fetchPacks',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await cardsApi.getPack()

      return { data: response.data }
    } catch (e: any) {
      console.log(e)
    }
  }
)

export type PacksType<D> = {
  cardPacks: D
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

export type CardsPackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}
export const packSelector = (state: RootStateType): PacksType<CardsPackType[]> | undefined =>
  state.pack
