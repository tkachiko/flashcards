import React from 'react'

import Delete from '../../../assets/icons/Delete.svg'
import Edit from '../../../assets/icons/Edit.svg'
import Teacher from '../../../assets/icons/teacher.svg'

import s from './ActionSetting.module.scss'
export const ActionSetting = () => {
  return (
    <div className={s.container}>
      <img src={Teacher} />
      <img src={Edit} />
      <img src={Delete} />
    </div>
  )
}
