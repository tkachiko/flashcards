import axios, { AxiosError } from 'axios'

import { registerApi } from '../../../api/registerApi'
import { setErrorAC, setSubmittingAC } from '../../../app/app-reducer'
import { ThunkAppDispatchType } from '../../../common/types/types'

// thunks
export const createUserTC =
  (email: string, password: string): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC('loading'))
    try {
      await registerApi.createUser(email, password)
      dispatch(setSubmittingAC('success'))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<{ error: string }>

        const finalError = error.response ? error.response.data.error : e.message

        dispatch(setErrorAC(finalError))
        dispatch(setSubmittingAC('failed'))
      } else {
        dispatch(setSubmittingAC('failed'))
        dispatch(setErrorAC('An unexpected error occurred'))
      }
    }
  }
