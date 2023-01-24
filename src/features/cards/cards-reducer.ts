import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { cardsApi } from '../../api/cardsApi'
import { setSubmittingAC } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import {
  AsyncThunkConfig,
  CardType,
  CreateCardRequestType,
  GetCardsRequestType,
  GetCardsResponseType,
  UpdateCardRequestType,
} from '../../common/types/types'
import { errorMessage } from '../../utils/error-utils'

// thunk

export const fetchCards = createAsyncThunk<
  { data: GetCardsResponseType<CardType[]>; packId: string | null },
  GetCardsRequestType,
  AsyncThunkConfig
>('cards/fetchCards', async (data, thunkAPI) => {
  thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const response = await cardsApi.getCards(data)

    console.log(response)

    thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))

    return { packId: data.cardsPack_id, data: response.data }
  } catch (e) {
    const error = e as Error | AxiosError

    return thunkAPI.rejectWithValue(errorMessage(thunkAPI.dispatch, error))
  }
})

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async (
    { data, updatedCard }: { data: GetCardsRequestType; updatedCard: UpdateCardRequestType },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      await cardsApi.updateCard(updatedCard)
      await thunkAPI.dispatch(fetchCards(data))
      thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))
    } catch (e: any) {
      thunkAPI.dispatch(setSubmittingAC({ status: 'failed' }))
    }
  }
)

export const createCard = createAsyncThunk<
  { data: CardType[] },
  { card: CreateCardRequestType },
  AsyncThunkConfig
>('cards/createCard', async (data, thunkAPI) => {
  thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const response = await cardsApi.createCard({
      cardsPack_id: data.card.cardsPack_id,
      question: 'question',
      answer: 'answer',
      pageCount: 10,
    })

    thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))
    thunkAPI.dispatch(
      fetchCards({
        cardsPack_id: data.card.cardsPack_id,
        pageCount: 10,
      })
    )

    return response.data
  } catch (e: any) {
    thunkAPI.dispatch(setSubmittingAC({ status: 'failed' }))
    errorMessage(thunkAPI.dispatch, e)
  }
})

export const deleteCardTh = createAsyncThunk<
  {},
  { data: GetCardsRequestType; cardId: string },
  AsyncThunkConfig
>(
  'cards/deleteCard',
  async ({ data, cardId }: { data: GetCardsRequestType; cardId: string }, thunkAPI) => {
    thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      await cardsApi.deleteCard(cardId)
      await thunkAPI.dispatch(fetchCards(data))
      thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))

      return cardId
    } catch (e: any) {
      thunkAPI.dispatch(setSubmittingAC({ status: 'failed' }))
      errorMessage(thunkAPI.dispatch, e)
    }
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
      packName: '' as string,
    },
    packId: null as string | null,
    isLoaded: false,
    searchParams: {
      cardName: '' as string,
    },
  },
  reducers: {
    setPackId(state, action: PayloadAction<string>) {
      state.packId = action.payload
    },
    setSearchCardName(state, action: PayloadAction<string>) {
      state.searchParams.cardName = action.payload
    },
    setCardPage(state, action: PayloadAction<number>) {
      state.cardsData.page = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      if (action.payload) {
        state.cardsData = { ...action.payload.data }
        state.isLoaded = true
        state.packId = action.payload.packId
      }
    })
    builder.addCase(createCard.fulfilled, (state, action) => {
      if (action.payload) {
        state.cardsData.cards = action.payload.data
        state.isLoaded = true
      }
    })
  },
})

export const cardsReducer = slice.reducer
export const { setPackId, setSearchCardName, setCardPage } = slice.actions
export const cardsTotalCountSelector = (state: RootStateType): number =>
  state.cards.cardsData.cardsTotalCount
export const userIdSelector = (state: RootStateType): string => state.profile.profile._id
export const packUserIdSelector = (state: RootStateType): string | null =>
  state.cards.cardsData.packUserId
export const packNameSelector = (state: RootStateType): string => state.cards.cardsData.packName
export const cardNameSelector = (state: RootStateType): string => state.cards.searchParams.cardName
export const pageCardsSelector = (state: RootStateType): number => state.cards.cardsData.page
export const pageCountCardsSelector = (state: RootStateType): number =>
  state.cards.cardsData.pageCount

// types
export type CardsReducerType =
  | ReturnType<typeof setPackId>
  | ReturnType<typeof setSearchCardName>
  | ReturnType<typeof setCardPage>

export const cardsListTableNames: CardsTableHeaderDataType[] = [
  { name: 'Question', sortName: 'question' },
  { name: 'Answer', sortName: 'answer' },
  { name: 'Last Updated', sortName: 'updated' },
  { name: 'Grade', sortName: 'user_name' },
  { name: '', sortName: '' },
]

export type CardsTableHeaderDataType = {
  name: string
  sortName: string
}
