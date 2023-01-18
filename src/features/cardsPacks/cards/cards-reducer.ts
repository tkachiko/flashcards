import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

import { cardsApi } from '../../../api/cardsApi'
import { setSubmittingAC } from '../../../app/app-reducer'
import { CardType, CreateCardRequestType, GetCardsRequestType } from '../../../common/types/types'
import { errorMessage } from '../../../utils/error-utils'

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
    cardsPack_id: '63c86c606918f3393221ed4d',
    question: 'Ya?',
    answer: 'Yo',
  })

  thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))
  console.log(response)
  thunkAPI.dispatch(
    fetchCardsTh({
      cardsPack_id: '63c86c606918f3393221ed4d',
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
    getCards(state, action: PayloadAction<string>) {},
    createCard(state, action: PayloadAction<CreateCardRequestType>) {},
  },
  extraReducers: builder => {
    builder.addCase(fetchCardsTh.fulfilled, (state, action) => {
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
export const { getCards, createCard } = slice.actions

// types
export type CardsReducerType = ReturnType<typeof getCards> | ReturnType<typeof createCard>

type AsyncThunkConfig = {
  /* return type for `thunkApi.getState` */
  state?: unknown
  /* type for thunkApi.dispatch */
  dispatch?: Dispatch
  /* type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown
  /* type to be passed into rejectWithValue's first argument that will end up on rejectedAction.payload */
  rejectValue?: unknown
  /* return type of the `serializeError` option callback */
  serializedErrorType?: unknown
  /* type to be returned from the getPendingMeta option callback & merged into pendingAction.meta */
  pendingMeta?: unknown
  /* type to be passed into the second argument of `fulfillWithValue` to finally be merged into
   `fulfilledAction.meta` */
  fulfilledMeta?: unknown
  /* type to be passed into the second argument of rejectWithValue to finally be merged into rejectedAction.meta */
  rejectedMeta?: unknown
}
