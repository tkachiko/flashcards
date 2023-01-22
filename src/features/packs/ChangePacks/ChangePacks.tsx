import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import Delete from '../../../assets/icons/Delete.svg'
import Edit from '../../../assets/icons/Edit.svg'
import Teacher from '../../../assets/icons/teacher.svg'
import { userIdSelector } from '../../profile/profile-reducer'
import { deletePack, updatePack } from '../cardsPack-reducer'

import style from './ChangePacks.module.scss'

type ActionSettingType = {
  id: string
  userId: string
}
export const ChangePacks = (props: ActionSettingType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector(userIdSelector)

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
    <div className={style.container}>
      {userId === props.userId ? (
        <>
          <img className={style.icon} onClick={handlerOpenCards} src={Teacher} alt={'Teacher'} />
          <img className={style.icon} onClick={handlerUpdatePack} src={Edit} alt={'Edit'} />
          <img className={style.icon} onClick={handlerDeletePack} src={Delete} alt={'Delete'} />
        </>
      ) : (
        <img className={style.icon} onClick={handlerOpenCards} src={Teacher} alt={'Teacher'} />
      )}
    </div>
  )
}
