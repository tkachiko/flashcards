import React from 'react'
import styleContainer from '../../../../main/ui/common/styles/Container.module.css'
import style from './CheckEmail.module.css'
import {PATH} from '../../../../main/ui/routes/routes'
import {NavLink} from 'react-router-dom'

export const CheckEmail = () => {
  return (
    <div className={`${style.wrapper} ${styleContainer.container}`}>
      <div className={style.container}>
        <h1 className={style.heading}>Check Email</h1>
        <div className={style.image}></div>
        <div className={style.instructions}>We’ve sent an Email with instructions to example@mail.com
        </div>
        <NavLink to={PATH.LOGIN}>Back to login</NavLink>
      </div>
    </div>
  )
}