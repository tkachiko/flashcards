import React from 'react'

import { SuperEditableSpan } from '../../common/components/SuperEditableSpan/SuperEditableSpan'
import styleContainer from '../../common/styles/Container.module.css'

import style from './Profile.module.css'

export const Profile = () => {
  return (
    <div className={`${style.wrapper} ${styleContainer.container}`}>
      <div className={style.container}>
        <h1 className={style.heading}>Personal Information</h1>
        <div className={style.image}>
          <div className={style.cameraIcon}></div>
        </div>
        <SuperEditableSpan labelValue={'Nickname'} value={'Ivan'} type={'text'} />
        <div className={style.email}>j&johnson@gmail.com</div>
        <button className={style.button}>
          Log out
          <div className={style.logOutIcon}></div>
        </button>
      </div>
    </div>
  )
}
