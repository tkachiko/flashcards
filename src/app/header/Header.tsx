import * as React from 'react'

import itIncubator from '../../assets/images/It-incubator.svg'

import s from './Header.module.scss'
export const Header = () => {
  return (
    <div className={s.container}>
      <img src={itIncubator} />
      <button className={s.button}>Sign in</button>
    </div>
  )
}
