import React from 'react'

import { FormGroup } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import styleContainer from '../../../../common/styles/Container.module.scss'
import { forgotPasswordTC } from '../../password-reducer'

import style from './ForgotPassword.module.css'

export const ForgotPassword = () => {
  type FormikErrorsType = {
    email?: string
  }

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const forgotPasswordSuccess = useAppSelector(state => state.password.forgotPasswordSuccess)

  const formik = useFormik({
    initialValues: {
      email: '',
      message:
        "<div>У тебя 5 минут что бы изменить пароль, иначе я протухну ©Токен, <br>Пароль восстановил, альцгеймер получил ©Народная мудрость <br><a href='http://localhost:3000/#/new-password/$token$'>Ну нажми же ты на меня</a></div>",
    },
    validate: values => {
      const errors: FormikErrorsType = {}

      if (!values.email) {
        errors.email = 'email required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(forgotPasswordTC(values))
      formik.resetForm()
    },
  })

  if (forgotPasswordSuccess) {
    navigate(PATH.CHECK_EMAIL)
  }

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
              </FormControl>

              <div className={style.instructions}>
                Enter your email address and we will send you further instructions
              </div>

              <Button
                variant={'contained'}
                type={'submit'}
                fullWidth
                disableRipple
                className={style.button}
              >
                Send instructions
              </Button>
            </FormGroup>
          </form>
          <div className={style.account}>Did you remember your password?</div>
          <NavLink className={style.tryLogIn} to={PATH.LOGIN}>
            Try logging in
          </NavLink>
        </div>
      </Paper>
    </div>
  )
}
