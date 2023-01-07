import React from 'react'

import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { SuperInputText } from '../../../common/components/SuperInputText/SuperInputText'

import styleContainer from '../../../common/styles/Container.module.css'
import style from './NewPassword.module.css'

export const NewPassword = () => {
  return (
    <div className={`${style.formWrapper} ${styleContainer.container}`}>
      <div className={style.formContainer}>
        <h1 className={style.heading}>Create new password</h1>
        <form className={style.form}>
          <div className={style.password}>
            <label htmlFor={'password'} className={style.label}></label>
            <SuperInputText
              placeholder={'Password'}
              id={'password'}
              name={'password'}
              type={'password'}
            />
            <div className={style.showHidePassword}></div>
          </div>
          <div className={style.instructions}>
            Create new password and we will send you further instructions to email
          </div>
          <SuperButton className={style.button}>Create new password</SuperButton>
        </form>
      </div>
    </div>
  )
}
