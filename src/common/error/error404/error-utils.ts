import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setErrorAC } from '../../../app/app-reducer'

export const ErrorMessage = (dispatch: Dispatch, err: { error: string }) => {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<{ error: string }>

    const finalError = error.response ? error.response.data.error : err.message

    dispatch(setErrorAC(finalError))
  } else {
    dispatch(setErrorAC('An unexpected error occurred'))
  }
}
