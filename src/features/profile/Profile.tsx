import React, { useEffect, useState } from 'react'

import FormGroup from '@mui/material/FormGroup'
import LinearProgress from '@mui/material/LinearProgress'
import { useFormik } from 'formik'

import { InputTypeFileProfile } from '../../common/inputFile/InputTypeFileProfile'

import { changeNameAndAvatarTC, emailSelector, nameSelector } from './profile-reducer'
import style from './Profile.module.scss'

import { appStatusSelector } from 'app/app-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Back2Packs } from 'common/components/Back2Packs/Back2Packs'
import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar'
import { SuperEditableSpan } from 'common/components/SuperEditableSpan/SuperEditableSpan'
import styleContainer from 'common/styles/Container.module.scss'
import { logoutTC } from 'features/auth/login/auth-reducer'

type FormikErrorType = {
  nickname?: string
}

export const Profile = () => {
  const nickname = useAppSelector(nameSelector)
  const email = useAppSelector(emailSelector)
  const status = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()
  const [avatar, setImage] = useState('')
  const { values, errors, handleSubmit, isValid, getFieldProps } = useFormik({
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
      dispatch(changeNameAndAvatarTC({ name: values.nickname, avatar }))
    },
  })

  useEffect(() => {
    dispatch(changeNameAndAvatarTC({ name: values.nickname, avatar }))
  }, [avatar])

  const onLogout = () => {
    dispatch(logoutTC())
  }

  return (
    <div className={style.profile_container}>
      {status === 'loading' && <LinearProgress color={'primary'} />}
      <Back2Packs />
      <div className={`${style.wrapper} ${styleContainer.container}`}>
        <ErrorSnackbar />
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <div className={style.container}>
              <h1 className={style.heading}>Personal Information</h1>
              <InputTypeFileProfile setImage={setImage} />
              <SuperEditableSpan
                labelValue={'Nickname'}
                type={'text'}
                {...getFieldProps('nickname')}
                onEnter={handleSubmit}
                onBlur={() => handleSubmit()}
                onClick={() => handleSubmit()}
                isDisabled={!isValid}
              />
              <div className={style.fieldError}>{errors.nickname}</div>
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
