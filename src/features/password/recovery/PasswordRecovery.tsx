import React from 'react'
import styleContainer from './../../../main/ui/common/styles/Container.module.css'
import style from './PasswordRecovery.module.css'
import {SuperInputText} from '../../../main/ui/common/components/SuperInputText/SuperInputText'
import {SuperButton} from '../../../main/ui/common/components/SuperButton/SuperButton'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../main/ui/routes/routes'

export const PasswordRecovery = () => {
  return (
    <div className={`${style.formWrapper} ${styleContainer.container}`}>
      <div className={style.formContainer}>
        <h1 className={style.heading}>Forgot your password?</h1>
        <form className={style.form}>
          <div className={style.email}>
            <label htmlFor={'email'} className={style.label}>Email</label>
            <SuperInputText id={'email'} name={'email'} type={'text'} />
          </div>
          <div className={style.instructions}>Enter your email address and we will send you further instructions</div>
          <SuperButton className={style.button}>Send instructions</SuperButton>
        </form>
        <div className={style.account}>Did you remember your password?</div>
        <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
      </div>
    </div>
  )
}