import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { recoveryApi } from '../../api/recoveryApi'
import { setSubmittingAC } from '../../app/app-reducer'
import { RootStateType, useAppDispatch } from '../../app/store'
import {
  AsyncThunkConfig,
  SetNewPasswordType,
  ThunkAppDispatchType,
} from '../../common/types/types'
import { errorMessage } from '../../utils/error-utils'

// <
//     {data: тип респонса}, // то что приходит в state
//     {forgotPass: boolean, email: string} //тип аргументов, которые передаем в санку,
// {
//     rejectWithValue: тип еррора, который приходит с бека
// }
//
// >

// const usersAdapter = createEntityAdapter()
// usersAdapter.getInitialState({ loadingStatus: 'idle', error: null })

// { rejectWithValue }

const initialState = {
  forgotPasswordSuccess: false,
  forgetEmail: null as string | null,
  newPasswordSuccess: '' as string | boolean,
}

export const forgotPassTH = createAsyncThunk<
  { forgotPass: boolean; email: string },
  { forgotPass: boolean; email: string },
  AsyncThunkConfig
>('forgotPass', async (reqData: { forgotPass: boolean; email: string }, thunkAPI) => {
  thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
  try {
    const { forgotPass, email } = reqData
    const { data } = await recoveryApi.forgotPassword(email)

    //dispatch(sendPasswordAC({ forgotPass, email }))
    thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))

    return { data, forgotPass: forgotPass, email }
  } catch (err: any) {
    //   let error: AxiosError<ValidationErrors> = err
    //
    //   return rejectWithValue({ error: error.data.error })

    // let error: AxiosError<KnownError> = err // cast the error for access
    //
    // if (!error.response) {
    //   throw err
    // }

    return thunkAPI.rejectWithValue({ error: err?.response.data })
  }
})

export const newPasswordSuccessTH = createAsyncThunk<
  { newPasswordSuccess: boolean },
  { newPasswordSuccess: string; token: string },
  AsyncThunkConfig
>(
  'newPasswordSuccess',
  async (reqData: { newPasswordSuccess: string; token: string }, thunkAPI) => {
    thunkAPI.dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      await recoveryApi.setNewPassword({
        password: reqData.newPasswordSuccess,
        resetPasswordToken: reqData.token,
      })
      thunkAPI.dispatch(setSubmittingAC({ status: 'success' }))

      // dispatch(newPasswordSuccessAC({ newPasswordSuccess: true }))
      return { newPasswordSuccess: true }
    } catch (e: any) {
      return thunkAPI.rejectWithValue({ error: e.data.error })
    }
  }
)

const passwordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setStatusRD() {
      // юзается в санки
    },
  },
  extraReducers: builder => {
    builder.addCase(forgotPassTH.fulfilled, (state, action) => {
      state.forgotPasswordSuccess = action.payload.forgotPass
      state.forgetEmail = action.payload.email
    })
    builder.addCase(newPasswordSuccessTH.fulfilled, (state, action) => {
      state.newPasswordSuccess = action.payload.newPasswordSuccess
    })
  },
})

export const forgotPasswordSuccessSelector = (state: RootStateType) =>
  state.password.forgotPasswordSuccess

export const passwordReducer = passwordSlice.reducer

// export const forgotPasswordTCSlice =
//   (forgotPass: boolean, email: string = ''): ThunkAppDispatchType =>
//   async dispatch => {
//     dispatch(setSubmittingAC({ status: 'loading' }))
//     try {
//       await recoveryApi.forgotPassword(email)
//       dispatch(sendPasswordAC({ forgotPass, email }))
//     } catch (e) {
//       const error = e as AxiosError<{ error: string }>
//
//       errorMessage(dispatch, error)
//     } finally {
//       dispatch(setSubmittingAC({ status: 'idle' }))
//     }
//   }

// export const createNewPasswordTC =
//   (data: SetNewPasswordType): ThunkAppDispatchType =>
//   async dispatch => {
//     dispatch(setSubmittingAC({ status: 'loading' }))
//     try {
//       await recoveryApi.setNewPassword(data)
//       // dispatch(newPasswordSuccessAC({ newPasswordSuccess: true }))
//     } catch (e) {
//       const error = e as AxiosError<{ error: string }>
//
//       errorMessage(dispatch, error)
//     } finally {
//       dispatch(setSubmittingAC({ status: 'idle' }))
//     }
//   }

// sendPasswordAC(state, action: PayloadAction<{ forgotPass: boolean; email: string }>) {
//   state.forgotPasswordSuccess = action.payload.forgotPass
//   state.forgetEmail = action.payload.email
// },

// newPasswordSuccessAC(state, action: PayloadAction<{ newPasswordSuccess: boolean }>) {
//   state.newPasswordSuccess = action.payload.newPasswordSuccess
//

// export const { sendPasswordAC, newPasswordSuccessAC } = passwordSlice.actions
// export type PasswordRecoveryType =
//   | ReturnType<typeof sendPasswordAC>
//   | ReturnType<typeof newPasswordSuccessAC>
