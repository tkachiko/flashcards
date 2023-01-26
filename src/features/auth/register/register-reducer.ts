import { AxiosError } from 'axios'

import { registerApi } from 'api/registerApi'
import { setSubmittingAC } from 'app/app-reducer'
import { ThunkAppDispatchType } from 'common/types/types'
import { errorMessage } from 'utils/error-utils'

// thunks
export const createUserTC =
  (email: string, password: string): ThunkAppDispatchType =>
  async dispatch => {
    dispatch(setSubmittingAC({ status: 'loading' }))
    try {
      await registerApi.createUser(email, password)
      dispatch(setSubmittingAC({ status: 'success' }))
    } catch (e) {
      const error = e as AxiosError<{ error: string }>

      errorMessage(dispatch, error)
    }
  }
