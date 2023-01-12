import React, { useEffect } from 'react'

import { FormGroup, LinearProgress } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { StatusType } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/store'
import arrowBack from '../../assets/images/arrowBack.jpg'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { SuperEditableSpan } from '../../common/components/SuperEditableSpan/SuperEditableSpan'
import { logoutTC } from '../auth/login/auth-reducer'

import styleContainer from './../../common/styles/Container.module.scss'
import { changeNameTC } from './profile-reducer'
import style from './Profile.module.scss'

type FormikErrorType = {
  nickname?: string
}

export const Profile = () => {
  const nickname = useAppSelector<string>(state => state.profile.profile.name)
  const email = useAppSelector<string>(state => state.profile.profile.email)
  const status = useAppSelector<StatusType>(state => state.app.status)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  })

  const formik = useFormik({
    initialValues: {
      nickname,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (values.nickname.length < 1) {
        errors.nickname = 'At least 1 symbol in nickname'
      }
      if (values.nickname.length > 25) {
        errors.nickname = "Maximum nickname's length is 25!"
      }

      return errors
    },

    onSubmit: values => {
      dispatch(changeNameTC(values.nickname))
    },
  })

  const onLogout = () => {
    dispatch(logoutTC())
  }

  return (
    <div>
      {status === 'loading' && <LinearProgress color={'primary'} />}
      <div className={style.back}>
        <img className={style.image} src={arrowBack} alt={'arrow back'} />
        <span className={style.backText}>Back to Packs List</span>
      </div>
      <div className={`${style.wrapper} ${styleContainer.container}`}>
        <ErrorSnackbar />
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <div className={style.container}>
              <h1 className={style.heading}>Personal Information</h1>
              <div className={style.image}>
                <div className={style.cameraIcon}></div>
              </div>
              <SuperEditableSpan
                labelValue={'Nickname'}
                type={'text'}
                {...formik.getFieldProps('nickname')}
                onEnter={formik.handleSubmit}
                onBlur={() => formik.handleSubmit()}
                onClick={() => formik.handleSubmit()}
                isDisabled={!formik.isValid}
              />
              {formik.errors.nickname && (
                <div style={{ color: 'red' }}>{formik.errors.nickname}</div>
              )}
              <div className={style.email}>{email}</div>
              <button className={style.button} type={'button'} onClick={onLogout}>
                Log out
                <div className={style.logOutIcon}></div>
              </button>
            </div>
          </FormGroup>
        </form>
      </div>
    </div>
  )
}
