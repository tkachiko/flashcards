import React from 'react'

import { NavLink } from 'react-router-dom'

import { SuperButton } from '../../../main/ui/common/components/SuperButton/SuperButton'
import { SuperInputText } from '../../../main/ui/common/components/SuperInputText/SuperInputText'
import { PATH } from '../../../main/ui/routes/routes'

import styleContainer from './../../../main/ui/common/styles/Container.module.css'
import style from './Register.module.css'

export const Register = () => {
  return (
    <div className={`${style.formWrapper} ${styleContainer.container}`}>
      <div className={style.formContainer}>
        <h1 className={style.heading}>Sign Up</h1>
        <form className={style.form}>
          <div className={style.email}>
            <label htmlFor={'email'} className={style.label}>
              Email
            </label>
            <SuperInputText id={'email'} name={'email'} type={'text'} />
          </div>
          <div className={style.password}>
            <label htmlFor={'password'} className={style.label}>
              Password
            </label>
            <SuperInputText id={'password'} name={'password'} type={'password'} />
            <div className={style.showHidePassword}></div>
          </div>
          <div className={style.password}>
            <label htmlFor={'password'} className={style.label}>
              Confirm password
            </label>
            <SuperInputText id={'password'} name={'password'} type={'password'} />
            <div className={style.showHidePassword}></div>
          </div>
          <SuperButton className={style.button}>Sign Up</SuperButton>
        </form>
        <div className={style.account}>Already have an account?</div>
        <NavLink to={PATH.LOGIN}>Sign In</NavLink>
      </div>
    </div>
  )
}
