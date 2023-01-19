import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
        }
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPacks.fulfilled, (state, action) => {
            if (action.payload) {
                state.packs = action.payload.data
            }
        })
    },
})

export const cardsPackReducer = slice.reducer

export const {} = slice.actions

export const addPackTC = createAsyncThunk<{}, string, AsyncThunkConfig>(
  'cardsPack/addPack',
  async (name: string, thunkAPI) => {
    thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      console.log(name)
      const response = await packsApi.createPack(name)

      thunkAPI.dispatch(fetchPacks({ filter: { page: 1, pageCount: 10, userId: '' } }))
      thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))

            return {data: response.data}
        } catch (e) {
            const error = e as Error | AxiosError

            return thunkAPI.rejectWithValue(errorMessage(thunkAPI.dispatch, error))
        }
    }
)
export const fetchPacks = createAsyncThunk<
  { data: PacksType<CardsPackType[]> },
  PaginationType,
  AsyncThunkConfig
>('cardsPack/fetchPacks', async (filter, thunkAPI) => {
  thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const response = await packsApi.getPack(filter.filter)

        thunkAPI.dispatch(setSubmittingAC({status: 'success'}))

        return {data: response.data}
    } catch (e) {
        const error = e as Error | AxiosError

        return thunkAPI.rejectWithValue(errorMessage(thunkAPI.dispatch, error))
    }
})

export const deletePack = createAsyncThunk<
    { data: PacksType<CardsPackType[]> },
    string,
    AsyncThunkConfig
>('cardsPack/deletePack', async (id: string, thunkAPI) => {
  thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const response = await packsApi.deletePack(id)

    thunkAPI.dispatch(fetchPacks({ filter: { page: 1, pageCount: 10, userId: '' } }))
    thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))

        return {data: response.data}
    } catch (e) {
        const error = e as Error | AxiosError

        return thunkAPI.rejectWithValue(errorMessage(thunkAPI.dispatch, error))
    }
})

export const updatePack = createAsyncThunk<
    { data: PacksType<CardsPackType[]> },
    string,
    AsyncThunkConfig
>('cardsPack/updatePack', async (_id: string, thunkAPI) => {
  thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const response = await packsApi.updatePack(_id)

    thunkAPI.dispatch(fetchPacks({ filter: { page: 1, pageCount: 10, userId: '' } }))
    thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))

        return {data: response.data}
    } catch (e) {
        const error = e as Error | AxiosError

        return thunkAPI.rejectWithValue(errorMessage(thunkAPI.dispatch, error))
    }
})

export const packSelector = (state: RootStateType): PacksType<CardsPackType[]> => state.pack.packs
export const pageSelector = (state: RootStateType): number => state.pack.packs.page
export const cardPacksTotalCountSelector = (state: RootStateType): number =>
  state.pack.packs.cardPacksTotalCount
export const pageCountSelector = (state: RootStateType): number => state.pack.packs.pageCount

export type PaginationFilterType = {
  page: number
  pageCount: number
  userId: string
}

export type PaginationType = {
  filter: PaginationFilterType
}
