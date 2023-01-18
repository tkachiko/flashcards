import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import Delete from '../../../assets/icons/Delete.svg'
import Edit from '../../../assets/icons/Edit.svg'
import Teacher from '../../../assets/icons/teacher.svg'
import { deletePack, packSelector, updatePack } from '../cardsPack-reducer'

import s from './ChangePacks.module.scss'

type ActionSettingType = {
  id: string
}
export const ChangePacks = (props: ActionSettingType) => {
  const pack = useAppSelector(packSelector)
  const dispatch = useAppDispatch()
  const handlerDeletePack = () => {
    dispatch(deletePack(props.id))
  }
  const handlerUpdatePack = () => {
    dispatch(updatePack(props.id))
  }

  return (
    <div className={s.container}>
      <img className={s.icon} src={Teacher} />
      <img className={s.icon} onClick={handlerUpdatePack} src={Edit} />
      <img className={s.icon} onClick={handlerDeletePack} src={Delete} />
    </div>
  )
}
