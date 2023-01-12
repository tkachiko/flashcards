import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Checkbox, FormControlLabel, FormGroup, IconButton, LinearProgress } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import { useFormik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'

import { StatusType } from '../../../app/app-reducer'
import { PATH } from '../../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar'

import styleContainer from './../../../common/styles/Container.module.scss'
import { LoginTC } from './auth-reducer'
import style from './Login.module.scss'

type FormikErrorType = {
  email?: string
  password?: string
}

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector<StatusType>(state => state.app.status)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length < 7) {
        errors.password = 'Minimum number of characters 7'
      }

      return errors
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(LoginTC(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }
  const ForgotPassword = () => {
    navigate(PATH.PASSWORD_RECOVERY)
  }

  const SignIn = () => {
    navigate(PATH.REGISTER)
  }

  return (
    <div className={`${style.container} ${styleContainer.container}`}>
      <Paper>
        <ErrorSnackbar />
        <FormControl className={style.formControl}>
          {status === 'loading' && <LinearProgress color={'primary'} />}
          <h1 className={style.singIn}>Sign in</h1>
          <form onSubmit={formik.handleSubmit}>
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
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  style={{ width: '347px', paddingBottom: '5px' }}
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
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
              <FormControl sx={{ m: 1 }} variant="standard">
                <FormControlLabel
                  label={'Remember me'}
                  control={
                    <Checkbox
                      {...formik.getFieldProps('rememberMe')}
                      checked={formik.values.rememberMe}
                    />
                  }
                />
              </FormControl>
              <a className={style.forgotPassword} onClick={ForgotPassword}>
                Forgot Password?
              </a>
              <Button type={'submit'} variant={'contained'} className={style.button}>
                Sign In
              </Button>
            </FormGroup>
          </form>
          <p className={style.text}>Don&apos;t have an account?</p>
          <a className={style.signUp} onClick={SignIn}>
            Sign Up
          </a>
        </FormControl>
      </Paper>
    </div>
  )
}
