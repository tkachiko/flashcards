import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import Delete from '../../../assets/icons/Delete.svg'
import Edit from '../../../assets/icons/Edit.svg'
import Teacher from '../../../assets/icons/teacher.svg'
import { deletePack, isMyPackSelector, packSelector, updatePack } from '../cardsPack-reducer'

import s from './ChangePacks.module.scss'

type ActionSettingType = {
  id: string
  userId: string
}
export const ChangePacks = (props: ActionSettingType) => {
  const navigate = useNavigate()
  const pack = useAppSelector(packSelector)
  const dispatch = useAppDispatch()
  const isMyPack = useAppSelector(isMyPackSelector)

  const handlerDeletePack = () => {
    dispatch(deletePack({ id: props.id }))
  }
  const handlerUpdatePack = () => {
    dispatch(updatePack({ cardsPack: { _id: props.id } }))
  }
  const handlerOpenCards = () => {
    if (props.id) {
      navigate(PATH.CARDS)
    }
  }

  return (
    <div className={s.container}>
      {props.userId ? (
        <>
          <img className={s.icon} onClick={handlerOpenCards} src={Teacher} alt={'Teacher'} />
          <img className={s.icon} onClick={handlerUpdatePack} src={Edit} alt={'Edit'} />
          <img className={s.icon} onClick={handlerDeletePack} src={Delete} alt={'Delete'} />
        </>
      ) : (
        <img className={s.icon} onClick={handlerOpenCards} src={Teacher} alt={'Teacher'} />
      )}
    </div>
  )
}
