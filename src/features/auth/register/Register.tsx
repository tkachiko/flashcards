import React, { useEffect, useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { LinearProgress } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { setSubmittingAC, StatusType } from '../../../app/app-reducer'
import { PATH } from '../../../app/routes/routes'
import { RootStateType, useAppDispatch } from '../../../app/store'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar'
import styleContainer from '../../../common/styles/Container.module.scss'

import { createUserTC } from './register-reducer'
import style from './Register.module.scss'

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const error = useSelector<RootStateType, string | null>(state => state.app.error)
  const status = useSelector<RootStateType, StatusType>(state => state.app.status)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(createUserTC(values.email, values.password))
    },
  })

  useEffect(() => {
    if (!error && status === 'success') {
      navigate(PATH.LOGIN)
      dispatch(setSubmittingAC('idle'))
    }
  }, [status, error])

  return (
    <div className={`${style.formWrapper} ${styleContainer.container}`}>
      <Paper>
        {status === 'loading' && <LinearProgress color={'primary'} />}
        <form className={style.form} onSubmit={formik.handleSubmit}>
          <h1 className={style.heading}>Sign Up</h1>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor={'email'}>Email</InputLabel>
            <Input
              style={{ width: '347px' }}
              id={'email'}
              name={'email'}
              autoComplete={'email'}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <div className={style.fieldError}>{formik.touched.email && formik.errors.email}</div>
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor={'password'}>Password</InputLabel>
            <Input
              style={{ width: '347px' }}
              id={'password'}
              name={'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              type={!showPassword ? 'password' : 'input'}
              endAdornment={
                !showPassword ? (
                  <InputAdornment position="end">
                    <VisibilityOff
                      fontSize="medium"
                      className={style.passwordEye}
                      onClick={toggleShowPassword}
                    />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <Visibility
                      fontSize="medium"
                      className={style.passwordEye}
                      onClick={toggleShowPassword}
                    />
                  </InputAdornment>
                )
              }
            />
            <div className={style.fieldError}>
              {formik.touched.password && formik.errors.password}
            </div>
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor={'confirmPassword'}>Confirm password</InputLabel>
            <Input
              style={{ width: '347px' }}
              id={'confirm-password'}
              name={'confirmPassword'}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              type={!showConfirmPassword ? 'password' : 'input'}
              endAdornment={
                !showConfirmPassword ? (
                  <InputAdornment position="end">
                    <VisibilityOff
                      fontSize="medium"
                      className={style.passwordEye}
                      onClick={toggleShowConfirmPassword}
                    />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <Visibility
                      fontSize="medium"
                      className={style.passwordEye}
                      onClick={toggleShowConfirmPassword}
                    />
                  </InputAdornment>
                )
              }
            />
            <div className={style.fieldError}>
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </div>
          </FormControl>
          <Button
            variant={'contained'}
            type={'submit'}
            fullWidth
            disableRipple
            disabled={status === 'loading'}
            className={style.button}
          >
            Sign Up
          </Button>
        </form>
        <div className={style.account}>
          <span>Already have an account?</span>
          <NavLink to={PATH.LOGIN}>Sign In</NavLink>
        </div>
        {error && <ErrorSnackbar />}
      </Paper>
    </div>
  )
}
