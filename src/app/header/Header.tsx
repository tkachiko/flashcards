import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import style from './Header.module.scss'

import { PATH } from 'app/routes/routes'
import { useAppSelector } from 'app/store'
import itIncubator from 'assets/images/It-incubator.svg'
import avatar from 'assets/images/person.png'
import { isLoggedInSelector } from 'features/auth/login/auth-reducer'
import { nameSelector } from 'features/profile/profile-reducer'

export const Header = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const nickname = useAppSelector(nameSelector)
  const navigate = useNavigate()

  const handlerSignIn = () => {
    navigate(PATH.LOGIN)
  }

  const navigateToProfile = () => {
    navigate(PATH.PROFILE)
  }

  return (
    <div className={style.container}>
      <img src={itIncubator} alt={'incubator logo'} />
      {isLoggedIn ? (
        <div onClick={navigateToProfile} className={style.login_info}>
          <span className={style.nickname}>{nickname}</span>
          <div className={style.avatar}>
            <img src={avatar} alt={'avatar'} />
          </div>
        </div>
      ) : (
        <button className={style.button} onClick={handlerSignIn}>
          Sign in
        </button>
      )}
    </div>
  )
}
