import * as React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import itIncubator from '../../assets/images/It-incubator.svg'
import avatar from '../../assets/images/person.png'
import { PATH } from '../routes/routes'
import { RootStateType, useAppSelector } from '../store'

import style from './Header.module.scss'

export const Header = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const nickname = useSelector<RootStateType, string>(state => state.profile.profile.name)
  const navigate = useNavigate()

  return (
    <div className={style.container}>
      <img src={itIncubator} alt={'incubator logo'} />
      {isLoggedIn ? (
        <div className={style.login_info}>
          <span className={style.nickname}>{nickname}</span>
          <div className={style.avatar}>
            <img src={avatar} alt={'avatar'} />
          </div>
        </div>
      ) : (
        <button
          className={style.button}
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
