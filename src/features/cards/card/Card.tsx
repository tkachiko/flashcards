import React, { FC } from 'react'

import Rating from '@mui/material/Rating'
import TableCell from '@mui/material/TableCell'
import dayjs from 'dayjs'

import s from './Card.module.scss'
type PropsType = {
  question: string
  answer: string
  updated: string
  grade: number
  answerImg: string
  questionImg: string
}

export const Card: FC<PropsType> = ({
  question,
  answer,
  updated,
  grade,
  answerImg,
  questionImg,
}) => {
  return (
    <>
      <TableCell component="th" scope="row">
        {questionImg ? <img className={s.image} src={questionImg} /> : <>{question}</>}
      </TableCell>
      <TableCell align="left">
        {answerImg ? <img className={s.image} src={answerImg} /> : <>{answer}</>}
      </TableCell>
      <TableCell align="left">{dayjs(updated).format('DD.MM.YYYY')}</TableCell>
      <TableCell align="left">
        <Rating name="read-only" value={grade} precision={0.5} readOnly />
      </TableCell>
    </>
  )
}
