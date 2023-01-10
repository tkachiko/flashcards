import React from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  TextField,
} from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar'

import { LoginTC } from './auth-reducer'
import s from './Login.module.scss'

type FormikErrorType = {
  email?: string
  password?: string
}

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
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
  const SignUp = () => {
    navigate(PATH.REGISTER)
  }

  return (
    <div className={s.container}>
      <ErrorSnackbar />
      <FormControl>
        <FormLabel>
          <p className={s.SingIn}>Sign in</p>
        </FormLabel>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              variant="standard"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            )}
            <FormControl sx={{ m: 0 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                style={{ width: '347px' }}
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
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}
            </FormControl>

            <FormControlLabel
              label={'Remember me'}
              control={
                <Checkbox
                  {...formik.getFieldProps('rememberMe')}
                  checked={formik.values.rememberMe}
                />
              }
            />
            <a className={s.ForgotPassword} onClick={ForgotPassword}>
              Forgot Password?
            </a>
            <Button
              style={{ borderRadius: '30px' }}
              type={'submit'}
              variant={'contained'}
              color={'primary'}
            >
              Login
            </Button>
          </FormGroup>
        </form>
        <p className={s.text}>Already have an account?</p>
        <a className={s.SignUp} onClick={SignUp}>
          Sign Up
        </a>
      </FormControl>
    </div>
  )
}
