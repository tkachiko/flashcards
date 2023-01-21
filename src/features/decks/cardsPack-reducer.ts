import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { packsApi } from '../../api/packsApi'
import { setSubmittingAC } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { AsyncThunkConfig, CardsPackType, PacksType } from '../../common/types/types'
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
      pageCount: 10 as number,
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

export const addPackTC = createAsyncThunk<{}, string, AsyncThunkConfig>(
  'cardsPack/addPack',
  async (name: string, { dispatch, getState, rejectWithValue }) => {
    const state = getState() as RootStateType

    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      const response = await packsApi.createPack(name)

      dispatch(fetchPacks({ filter: { page: 1, pageCount: 10 } }))
      dispatch(setSubmittingAC({ status: 'success' }))

            return {data: response.data}
        } catch (e) {
            const error = e as Error | AxiosError

      return rejectWithValue(errorMessage(dispatch, error))
    }
  }
)
export const fetchPacks = createAsyncThunk<
  { data: PacksType<CardsPackType[]> },
  FilterType,
  AsyncThunkConfig
>('cardsPack/fetchPacks', async (filter, { dispatch, getState, rejectWithValue }) => {
  dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const state = getState() as RootStateType

    if (state.pack.isMyPacks) {
      filter.filter.userId = state.profile.profile._id
    } else {
      filter.filter.userId = ''
    }
    const response = await packsApi.getPack(filter.filter)

    dispatch(setSubmittingAC({ status: 'success' }))

        return {data: response.data}
    } catch (e) {
        const error = e as Error | AxiosError

    return rejectWithValue(errorMessage(dispatch, error))
  }
})

export const deletePack = createAsyncThunk<
  { data: PacksType<CardsPackType[]> },
  string,
  AsyncThunkConfig
>('cardsPack/deletePack', async (id: string, { getState, dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const response = await packsApi.deletePack(id)
    const state = getState() as RootStateType

    dispatch(fetchPacks({ filter: { page: 1, pageCount: 10 } }))
    dispatch(setSubmittingAC({ status: 'success' }))

        return {data: response.data}
    } catch (e) {
        const error = e as Error | AxiosError

    return rejectWithValue(errorMessage(dispatch, error))
  }
})

export const updatePack = createAsyncThunk<
  { data: PacksType<CardsPackType[]> },
  string,
  AsyncThunkConfig
>('cardsPack/updatePack', async (_id: string, { dispatch, getState, rejectWithValue }) => {
  const state = getState() as RootStateType

  dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const response = await packsApi.updatePack(_id)

    dispatch(fetchPacks({ filter: { page: 1, pageCount: 10 } }))
    dispatch(setSubmittingAC({ status: 'success' }))

        return {data: response.data}
    } catch (e) {
        const error = e as Error | AxiosError

    return rejectWithValue(errorMessage(dispatch, error))
  }
})


export const packSelector = (state: RootStateType): PacksType<CardsPackType[]> => state.pack.packs
export const isMyPackSelector = (state: RootStateType): boolean => state.pack.isMyPacks
export const pageSelector = (state: RootStateType): number => state.pack.packs.page
export const cardPacksTotalCountSelector = (state: RootStateType): number =>
  state.pack.packs.cardPacksTotalCount
export const pageCountSelector = (state: RootStateType): number => state.pack.packs.pageCount
export const maxCardsCountSelector = (state: RootStateType): number =>
  state.pack.packs.maxCardsCount
export const minCardsCountSelector = (state: RootStateType): number =>
  state.pack.packs.minCardsCount
export type PropsFilterType = {
  page: number
  pageCount: number
  userId?: string
  min?: number
  max?: number
  isMyPacks?: boolean
}


export type FilterType = {
  filter: PropsFilterType
}

export type CardsPacksActionType = ReturnType<typeof isMyPacksAC>
