import React from 'react'

import { FormGroup } from '@mui/material'
import { useFormik } from 'formik'

import { SuperEditableSpan } from '../../common/components/SuperEditableSpan/SuperEditableSpan'
import styleContainer from '../../common/styles/Container.module.scss'

import style from './Profile.module.css'

type FormikErrorType = {
  nickname?: string
}

export const Profile = () => {
  const nickname = 'Testik'
  const email = 'tratata@gmail.com'
  const formik = useFormik({
    initialValues: {
      nickname,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (values.nickname.length < 3) {
        errors.nickname = 'At least 3 symbols in nickname'
      }
      if (values.nickname.length > 10) {
        errors.nickname = 'Less than 10 symbols in nickname please!'
      }

      return errors
    },

    onSubmit: values => {
      alert(values.nickname)
    },
  })
  //useEffect(() => {}, [])

  return (
    <div className={`${style.wrapper} ${styleContainer.container}`}>
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
              onEnter={formik.handleSubmit}
              {...formik.getFieldProps('nickname')}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nickname && formik.errors.nickname && (
              <div style={{ color: 'red' }}>{formik.errors.nickname}</div>
            )}
            <div className={style.email}>{email}</div>
            <button className={style.button}>
              Log out
              <div className={style.logOutIcon}></div>
            </button>
          </div>
        </FormGroup>
      </form>
    </div>
  )
}
