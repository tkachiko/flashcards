import * as React from 'react'

import itIncubator from '../../assets/images/It-incubator.svg'
import avatar from '../../assets/images/person.png'
import { isLoggedInSelector } from '../../features/auth/login/auth-reducer'
import { nameSelector } from '../../features/profile/profile-reducer'
import { redirectHandler } from '../../utils/redirectHandler'
import { PATH } from '../routes/routes'
import { useAppSelector } from '../store'

import style from './Header.module.scss'

export const Header = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const nickname = useAppSelector(nameSelector)

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
        <button className={style.button} onClick={() => redirectHandler(PATH.LOGIN)}>
          Sign in
        </button>
      )}
    </div>
  )
}
