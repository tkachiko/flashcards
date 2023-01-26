import React, { FC, useState } from 'react'

import { Rating } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import dayjs from 'dayjs'

import { setGrade } from '../cards-reducer'

import { useAppDispatch } from 'app/store'

type PropsType = {
  question: string
  answer: string
  updated: string
  grade: number
  card_id: string
}

export const Card: FC<PropsType> = ({ question, answer, updated, grade, card_id }) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<number | null>(grade)

  const onSetGradeHandler = (newGrade: number) => {
    dispatch(setGrade({ card_id, grade: newGrade! }))
  }

  return (
    <>
      <TableCell component="th" scope="row">
        {question}
      </TableCell>
      <TableCell align="left">{answer}</TableCell>
      <TableCell align="left">{dayjs(updated).format('DD.MM.YYYY')}</TableCell>
      <TableCell align="left">
        <Rating
          name="grade"
          value={value}
          precision={0.5}
          onChange={async (event, newValue) => {
            await onSetGradeHandler(newValue!)
            setValue(newValue)
          }}
        />
      </TableCell>
    </>
  )
}
