import * as React from 'react'

import { useSelector } from 'react-redux'

import itIncubator from '../../assets/images/It-incubator.svg'
import avatar from '../../assets/images/person.png'
import { RootStateType, useAppSelector } from '../store'

import s from './Header.module.scss'
export const Header = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const nickname = useSelector<RootStateType, string>(state => state.profile.profile.name)

  return (
    <div className={s.container}>
      <img src={itIncubator} alt={'incubator logo'} />
      {isLoggedIn ? (
        <div className={s.login_info}>
          <span className={s.nickname}>{nickname}</span>
          <div className={s.avatar}>
            <img style={{ width: '36px', height: '36px' }} src={avatar} alt={'avatar'} />
          </div>
        </div>
      ) : (
        <button className={s.button}>Sign in</button>
      )}
    </div>
  )
}
