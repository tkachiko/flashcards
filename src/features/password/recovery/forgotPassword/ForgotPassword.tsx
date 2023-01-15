import React from 'react'

import { FormGroup } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { appErrorSelector } from '../../../../app/app-reducer'
import { PATH } from '../../../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { ErrorSnackbar } from '../../../../common/components/ErrorSnackbar/ErrorSnackbar'
import styleContainer from '../../../../common/styles/Container.module.scss'
import { forgotPasswordSuccessSelector, forgotPasswordTCSlice } from '../../password-reducer'

import style from './ForgotPassword.module.scss'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const forgotPasswordSuccess = useAppSelector(forgotPasswordSuccessSelector)
  const error = useAppSelector(appErrorSelector)

  const formik = useFormik({
    initialValues: {
      email: '',
      message:
        "<div>У тебя 5 минут что бы изменить пароль, иначе я протухну ©Токен, <br>Пароль восстановил, альцгеймер получил ©Народная мудрость <br><a href='http://localhost:3000/#/new-password/$token$'>Ну нажми же ты на меня</a></div>",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^(?!.*@[^,]*,)/)
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: values => {
      dispatch(forgotPasswordTCSlice(true, values.email))
      formik.resetForm()
    },
  })

  if (forgotPasswordSuccess) {
    return <Navigate to={PATH.CHECK_EMAIL} />
  }
  // useEffect(() => {
  // dispatch(forgotPasswordTCSlice(false))
  // }, [])

  return (
    <div className={`${style.formWrapper} ${styleContainer.container}`}>
      <Paper>
        <div className={style.formContainer}>
          <h1 className={style.heading}>Forgot your password?</h1>

          <form onSubmit={formik.handleSubmit} className={style.form}>
            <FormGroup>
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel>Email</InputLabel>
                <Input
                  style={{ width: '347px', paddingBottom: '5px' }}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className={style.fieldError}>{formik.errors.email}</div>
                )}
              </FormControl>

              <div className={style.instructions}>
                Enter your email address and we will send you further instructions
              </div>

              <Button type={'submit'} variant={'contained'} className={style.button}>
                Send Instructions
              </Button>
            </FormGroup>
          </form>
          <div className={style.account}>Did you remember your password?</div>
          <NavLink className={style.tryLogIn} to={PATH.LOGIN}>
            Try logging in
          </NavLink>
        </div>
      </Paper>
      {error && <ErrorSnackbar />}
    </div>
  )
}
