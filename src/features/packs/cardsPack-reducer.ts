import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { packsApi } from '../../api/packsApi'
import { setSubmittingAC } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import {
  AsyncThunkConfig,
  CreatePackResponseType,
  CreatePacksPayloadType,
  DeletePackPayloadType,
  DeletePackResponseType,
  GetPackSPayloadType,
  GetPacksResponseType,
  UpdatePackPayloadType,
  UpdatePackResponseType,
} from '../../common/types/types'
import { errorMessage } from '../../utils/error-utils'

const slice = createSlice({
  name: 'cardsPack',
  initialState: {
    packs: {
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
      pageCount: 4 as number,
    },
    isMyPacks: true as boolean,
  },
  reducers: {
    isMyPacksAC(state, action: PayloadAction<{ isMyPacks: boolean }>) {
      state.isMyPacks = action.payload.isMyPacks
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      if (action.payload) {
        state.packs = action.payload.data
      }
    })
  },
})

export const cardsPackReducer = slice.reducer

export const { isMyPacksAC } = slice.actions

export const addPackTC = createAsyncThunk<
  { data: CreatePackResponseType },
  CreatePacksPayloadType,
  AsyncThunkConfig
>(
  'cardsPack/addPack',
  async (payload: CreatePacksPayloadType, { dispatch, getState, rejectWithValue }) => {
    const state = getState() as RootStateType

    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      const response = await packsApi.createPack(payload)
      const { pageCount, page } = state.pack.packs

      dispatch(fetchPacks({ pageCount, page }))
      dispatch(setSubmittingAC({ status: 'success' }))

      return { data: response.data }
    } catch (e) {
      const error = e as Error | AxiosError

      return rejectWithValue(errorMessage(dispatch, error))
    }
  }
)
export const fetchPacks = createAsyncThunk<
  { data: GetPacksResponseType },
  GetPackSPayloadType,
  AsyncThunkConfig
>('cardsPack/fetchPacks', async (filter, { dispatch, getState, rejectWithValue }) => {
  dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const state = getState() as RootStateType

    if (state.pack.isMyPacks) {
      filter.user_id = state.profile.profile._id
    } else {
      filter.user_id = ''
    }
    const response = await packsApi.getPack(filter)

    dispatch(setSubmittingAC({ status: 'success' }))

    return { data: response.data }
  } catch (e) {
    const error = e as Error | AxiosError

    return rejectWithValue(errorMessage(dispatch, error))
  }
})

export const deletePack = createAsyncThunk<
  { data: DeletePackResponseType },
  DeletePackPayloadType,
  AsyncThunkConfig
>('cardsPack/deletePack', async (payload, { getState, dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const response = await packsApi.deletePack(payload)
    const state = getState() as RootStateType
    const { pageCount, page } = state.pack.packs

    dispatch(fetchPacks({ pageCount, page }))

    dispatch(setSubmittingAC({ status: 'success' }))

    return { data: response.data }
  } catch (e) {
    const error = e as Error | AxiosError

    return rejectWithValue(errorMessage(dispatch, error))
  }
})

export const updatePack = createAsyncThunk<
  { data: UpdatePackResponseType },
  UpdatePackPayloadType,
  AsyncThunkConfig
>(
  'cardsPack/updatePack',
  async (payload: UpdatePackPayloadType, { dispatch, getState, rejectWithValue }) => {
    const state = getState() as RootStateType

    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      const response = await packsApi.updatePack(payload)
      const { pageCount, page } = state.pack.packs

      dispatch(fetchPacks({ pageCount, page }))
      dispatch(setSubmittingAC({ status: 'success' }))

      return { data: response.data }
    } catch (e) {
      const error = e as Error | AxiosError

      return rejectWithValue(errorMessage(dispatch, error))
    }
  }
)

export const packSelector = (state: RootStateType): GetPacksResponseType => state.pack.packs
export const isMyPackSelector = (state: RootStateType): boolean => state.pack.isMyPacks
export const pageSelector = (state: RootStateType): number => state.pack.packs.page
export const cardPacksTotalCountSelector = (state: RootStateType): number =>
  state.pack.packs.cardPacksTotalCount
export const pageCountSelector = (state: RootStateType): number => state.pack.packs.pageCount
export const maxCardsCountSelector = (state: RootStateType): number =>
  state.pack.packs.maxCardsCount
export const minCardsCountSelector = (state: RootStateType): number =>
  state.pack.packs.minCardsCount
export type CardsPacksActionType = ReturnType<typeof isMyPacksAC>
