import React from 'react'

import { Checkbox, FormControlLabel, FormGroup, FormLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid/Grid'
import { useFormik } from 'formik'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { LoginTC } from './auth-reducer'
import s from './Login.module.scss'
import {Navigate, useNavigate} from "react-router-dom";
import {ErrorSnackbar} from "../../../common/components/ErrorSnackbar/ErrorSnackbar";
import {PATH} from "../../../app/routes/routes";
type FormikErrorType = {
  email?: string
  password?: string
}

export const Login = () => {
  const navigate=useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
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
  if(isLoggedIn){
    return <Navigate to={PATH.PROFILE} />
  }
  const ForgotPassword=()=> {
    navigate(PATH.PASSWORD_RECOVERY)
  }
  const SignUp=()=> {
    navigate(PATH.REGISTER)
  }
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <ErrorSnackbar/>
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
              <TextField
                style={{ width: '347px' }}
                type="password"
                label="Password"
                margin="normal"
                variant="standard"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <a className={s.ForgotPassword} onClick={ForgotPassword}>Forgot Password?</a>
              <Button style={{borderRadius:'30px'}} type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </form>
          <p className={s.text}>Already have an account?</p>
          <a className={s.SignUp} onClick={SignUp}>Sign Up</a>
        </FormControl>
      </Grid>
    </Grid>
  )
}
