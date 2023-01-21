import React, { FC } from 'react'

import { RootStateType, useAppDispatch, useAppSelector } from '../../../app/store'
import Delete from '../../../assets/icons/Delete.svg'
import Edit from '../../../assets/icons/Edit.svg'
import { deleteCardTh } from '../cards-reducer'

import style from './CardControls.module.scss'

type PropsType = {
  id: string
}

export const CardControls: FC<PropsType> = ({ id }) => {
  const { cardsData, packId } = useAppSelector((state: RootStateType) => state.cards)
  const dispatch = useAppDispatch()

  const onEditCardHandler = () => {}

  const onDeleteCardHandler = () => {
    dispatch(
      deleteCardTh({
        data: {
          cardsPack_id: packId,
        },
        cardId: id,
      })
    )
  }

  return (
    <div className={style.container}>
      <img className={style.icon} onClick={onEditCardHandler} src={Edit} />
      <img className={style.icon} onClick={onDeleteCardHandler} src={Delete} />
    </div>
  )
}
