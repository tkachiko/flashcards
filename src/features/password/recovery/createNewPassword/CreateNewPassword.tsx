import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import style from './CreateNewPassword.module.scss'

import { PATH } from 'app/routes/routes'
import { useAppDispatch, useAppSelector } from 'app/store'
import styleContainer from 'common/styles/Container.module.scss'
import { newPasswordSuccessTH } from 'features/password/password-reducer'

export const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false)

  const newPasswordSuccess = useAppSelector(state => state.password.newPasswordSuccess)
  const params = useParams()
  const token = params.token

  const dispatch = useAppDispatch()

  const toggleShowPassword = () => {
    setShowPassword(show => !show)
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      resetPasswordToken: token,
    },

    validationSchema: Yup.object({
      password:
        Yup.number() &&
        Yup.string()
          .min(3, 'Must be 3 characters or less')
          .max(9, 'Must be 9 characters or less')
          .required('Required'),
    }),
    onSubmit: values => {
      dispatch(
        newPasswordSuccessTH({
          newPasswordSuccess: values.password,
          token: token as string,
        })
      )
      formik.resetForm()
    },
  })

  if (newPasswordSuccess) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={`${style.formWrapper} ${styleContainer.container}`}>
      <div className={style.formContainer}>
        <h1 className={style.heading}>Create new password</h1>
        <form className={style.form} onSubmit={formik.handleSubmit}>
          <div className={style.password}>
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor={'password'}>Password</InputLabel>
              <Input
                style={{ width: '347px', paddingBottom: '5px' }}
                id={'password'}
                {...formik.getFieldProps('password')}
                type={showPassword ? 'input' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && formik.errors.password && (
                <div className={style.fieldError}>{formik.errors.password}</div>
              )}
            </FormControl>
          </div>
          <div className={style.instructions}>
            Create new password and we will send you further instructions to email
          </div>

          <Button
            variant={'contained'}
            type={'submit'}
            fullWidth
            disableRipple
            className={style.button}
          >
            Create new password
          </Button>
        </form>
      </div>
    </div>
  )
}
