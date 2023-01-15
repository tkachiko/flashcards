import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { cardsApi } from '../../../api/cardsApi'
import { setSubmittingAC } from '../../../app/app-reducer'
import { CardType, GetCardsRequestType } from '../../../common/types/types'

// thunk

export const getCardsTC = createAsyncThunk(
  'cards/getCards',
  async (data: GetCardsRequestType, { dispatch }) => {
    // dispatch(setSubmittingAC({ status: 'loading' }))
    const response = await cardsApi.getCards(data)

    dispatch(setSubmittingAC({ status: 'success' }))

    return { packId: data.cardsPack_id, data: response.data }
  }
)

const slice = createSlice({
  name: 'cards',
  initialState: {
    cardsData: {
      cards: [] as CardType[],
      cardsTotalCount: 0 as number,
      maxGrade: 0 as number,
      minGrade: 0 as number,
      packUserId: null as string | null,
      page: 1 as number,
      pageCount: 10 as number,
    },
    packId: null as string | null,
    isLoaded: false,
  },
  reducers: {
    getCardsAC(state, action: PayloadAction<string>) {
      state.packId = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getCardsTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.cardsData = { ...action.payload.data }
        state.isLoaded = true
        state.packId = action.payload.packId
      }
    })
    //   // builder.addCase(deleteCard.fulfilled, (state, action) => {
    //   //   if (action.payload) {
    //   //     state.cardsData.cards = state.cardsData.cards.filter(c => c._id !== action.payload)
    //   //   }
    //   // })
  },
})

export const cardsReducer = slice.reducer
export const { getCardsAC } = slice.actions

// types
export type CardsReducerType = ReturnType<typeof getCardsAC>
