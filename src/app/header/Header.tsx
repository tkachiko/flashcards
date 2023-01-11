import * as React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import itIncubator from '../../assets/images/It-incubator.svg'
import avatar from '../../assets/images/person.png'
import { PATH } from '../routes/routes'
import { RootStateType, useAppSelector } from '../store'

import s from './Header.module.scss'
export const Header = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const nickname = useSelector<RootStateType, string>(state => state.profile.profile.name)
  const navigate = useNavigate()

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
        <button
          className={s.button}
          onClick={() => {
            navigate(PATH.LOGIN)
          }}
        >
          Sign in
        </button>
      )}
    </div>
  )
}
