import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../app/routes/routes'
import { useAppSelector } from '../../../../app/store'
import styleContainer from '../../../../common/styles/Container.module.scss'

import style from './CheckEmail.module.css'

export const CheckEmail = () => {
  const email = useAppSelector(state => state.password.forgetEmail)

  return (
    <div className={`${style.wrapper} ${styleContainer.container}`}>
      <div className={style.container}>
        <h1 className={style.heading}>Check Email</h1>
        <div className={style.image}></div>
        <div className={style.instructions}>We’ve sent an Email with instructions to {email}</div>
        <NavLink to={PATH.LOGIN}>Back to login</NavLink>
      </div>
    </div>
  )
}
