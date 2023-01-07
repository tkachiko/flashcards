import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { SuperCheckbox } from '../../../common/components/SuperCheckbox/SuperCheckbox'
import { SuperInputText } from '../../../common/components/SuperInputText/SuperInputText'
import styleContainer from '../../../common/styles/Container.module.scss'

import style from './Login.module.css'

export const Login = () => {
  return (
    <div className={`${style.formWrapper} ${styleContainer.container}`}>
      <div className={style.formContainer}>
        <h1 className={style.heading}>Sign In</h1>
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
          <div className={style.rememberMe}>
            <label htmlFor={'rememberMe'} className={style.label}></label>
            <SuperCheckbox name={'rememberMe'}>Remember me</SuperCheckbox>
          </div>
          <NavLink to={PATH.PASSWORD_RECOVERY}>Forgot Password?</NavLink>
          <SuperButton className={style.button}>Sign In</SuperButton>
        </form>
        <div className={style.account}>Don&rsquo;t have an account?</div>
        <NavLink to={PATH.REGISTER}>Sign Up</NavLink>
      </div>
    </div>
  )
}
