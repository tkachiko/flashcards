import React, { FC } from 'react'

import { RootStateType, useAppDispatch, useAppSelector } from '../../../app/store'
import Delete from '../../../assets/icons/Delete.svg'
import Edit from '../../../assets/icons/Edit.svg'
import { deleteCardTh, updateCard } from '../cards-reducer'

import style from './CardControls.module.scss'

type PropsType = {
  id: string
  question: string
  answer: string
}

export const CardControls: FC<PropsType> = ({ id, question, answer }) => {
  const { cardsData, packId } = useAppSelector((state: RootStateType) => state.cards)

  const dispatch = useAppDispatch()

  const onEditCardHandler = () => {
    dispatch(
      updateCard({
        updatedCard: {
          _id: id,
          question: 'new question',
          answer: 'new answer',
        },
        data: {
          cardsPack_id: packId,
          question,
          answer,
        },
      })
    )
  }

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
