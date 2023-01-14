import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import {setErrorAC, setSubmittingAC} from '../app/app-reducer'



export const ErrorMessage = (dispatch: Dispatch, err: AxiosError | Error) => {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<{ error: string }>

    const finalError = error.response ? error.response.data.error : err.message

    dispatch(setSubmittingAC('failed'))
    dispatch(setErrorAC(finalError))
  } else {
    console.log(err)
    dispatch(setSubmittingAC('failed'))
    dispatch(setErrorAC(err.message))
  }
}
