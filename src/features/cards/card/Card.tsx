import React, { FC } from 'react'

import Rating from '@mui/material/Rating'
import TableCell from '@mui/material/TableCell'
import dayjs from 'dayjs'

type PropsType = {
  question: string
  answer: string
  updated: string
  grade: number
}

export const Card: FC<PropsType> = ({ question, answer, updated, grade }) => {
  return (
    <>
      <TableCell component="th" scope="row">
        {question}
      </TableCell>
      <TableCell align="left">{answer}</TableCell>
      <TableCell align="left">{dayjs(updated).format('DD.MM.YYYY')}</TableCell>
      <TableCell align="left">
        <Rating name="read-only" value={grade} precision={0.5} readOnly />
      </TableCell>
    </>
  )
}
