import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { cardsApi } from '../../api/cardsApi'
import { setSubmittingAC } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import {
  AsyncThunkConfig,
  CardType,
  CreateCardRequestType,
  GetCardsRequestType,
} from '../../common/types/types'
import { errorMessage } from '../../utils/error-utils'

// thunk

export const fetchCardsTh = createAsyncThunk(
  'cards/fetchCards',
  async (data: GetCardsRequestType, { dispatch }) => {
    dispatch(setSubmittingAC({ status: 'loading' }))
    const response = await cardsApi.getCards(data)

    dispatch(setSubmittingAC({ status: 'success' }))

    return { packId: data.cardsPack_id, data: response.data }
  }
)

export const createCardTh = createAsyncThunk<
  { data: CardType[] },
  { card: CreateCardRequestType },
  AsyncThunkConfig
>('cards/createCard', async (data, thunkAPI) => {
  thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
  const response = await cardsApi.createCard({
    cardsPack_id: data.card.cardsPack_id,
    question: 'Ya?',
    answer: 'Yo',
  })

  thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))
  console.log(response)
  thunkAPI.dispatch(
    fetchCardsTh({
      cardsPack_id: data.card.cardsPack_id,
    })
  )

  return response.data
})

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
    setPackId(state, action: PayloadAction<string>) {
      state.packId = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCardsTh.fulfilled, (state, action) => {
      console.log(action.payload.packId)
      if (action.payload) {
        state.cardsData = { ...action.payload.data }
        state.isLoaded = true
        state.packId = action.payload.packId
      }
    })
    builder.addCase(createCardTh.fulfilled, (state, action) => {
      if (action.payload) {
        state.cardsData.cards = action.payload.data
        state.isLoaded = true
      }
    })
  },
})

export const deleteCardTh = createAsyncThunk(
  'cards/deleteCard',
  async ({ data, cardId }: { data: GetCardsRequestType; cardId: string }, { dispatch }) => {
    try {
      dispatch(setSubmittingAC({ status: 'loading' }))
      await cardsApi.deleteCard(cardId)
      await dispatch(fetchCardsTh(data))
      dispatch(setSubmittingAC({ status: 'success' }))

      return cardId
    } catch (e: any) {
      dispatch(setSubmittingAC({ status: 'failed' }))
      errorMessage(dispatch, e)
    }
  }
)

export const cardsReducer = slice.reducer
export const { setPackId } = slice.actions
export const cardsTotalCountSelector = (state: RootStateType): number =>
  state.cards.cardsData.cardsTotalCount

// types
export type CardsReducerType = ReturnType<typeof setPackId>
