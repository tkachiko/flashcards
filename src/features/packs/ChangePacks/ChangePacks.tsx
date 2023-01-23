import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import Teacher from '../../../assets/icons/teacher.svg'
import { DeleteModal } from '../../modal/DeleteModal'
import { EditModal } from '../../modal/EditModal'
import { userIdSelector } from '../../profile/profile-reducer'

import style from './ChangePacks.module.scss'

type ActionSettingType = {
  id: string
  userId: string
  name: string
}
export const ChangePacks = (props: ActionSettingType) => {
  const navigate = useNavigate()
  const userId = useAppSelector(userIdSelector)

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
          <div>
            <EditModal id={props.id} name={props.name} />
          </div>
          <DeleteModal id={props.id} name={props.name} />
        </>
      ) : (
        <img className={style.icon} onClick={handlerOpenCards} src={Teacher} alt={'Teacher'} />
      )}
    </div>
  )
}
