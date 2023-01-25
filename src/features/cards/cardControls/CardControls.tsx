import React, { FC } from 'react'

import { DeleteModalCard } from '../../modal/DeleteModalCard'
import { EditModalCard } from '../../modal/EditModalCard'


import style from './CardControls.module.scss'

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
