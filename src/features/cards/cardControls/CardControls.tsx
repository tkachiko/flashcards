import React, { FC } from 'react'

import style from './CardControls.module.scss'

import { DeleteModalCard } from 'features/modal/DeleteModalCard'
import { EditModalCard } from 'features/modal/EditModalCard'

type PropsType = {
  id: string
  question: string
  answer: string
}

export const CardControls: FC<PropsType> = ({ id, question, answer }) => {
  return (
    <div className={style.container}>
      <EditModalCard id={id} questionValue={question} answerValue={answer} />
      <DeleteModalCard id={id} questionValue={question} />
    </div>
  )
}
