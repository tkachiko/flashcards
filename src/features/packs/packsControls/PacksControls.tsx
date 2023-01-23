import React, { FC } from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import { useAppDispatch } from '../../../app/store'
import { setPackId } from '../../cards/cards-reducer'
import s from '../CardsPack.module.scss'
import { ChangePacks } from '../ChangePacks/ChangePacks'

type PacksControlsType = {
  id: string
  name: string
  cardsCount: number
  updated: string
  user_name: string
  userId: string
}
export const PacksControls: FC<PacksControlsType> = ({
  id,
  name,
  user_name,
  userId,
  updated,
  cardsCount,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handlerOpenCards = (packId: string) => {
    if (packId) {
      dispatch(setPackId(packId))
      navigate(PATH.CARDS + `/${packId}`)
    }
  }

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell
        sx={{ cursor: 'pointer', width: '22%' }}
        component="th"
        scope="row"
        onClick={() => handlerOpenCards(id)}
      >
        {name}
      </TableCell>
      <TableCell sx={{ width: '22%' }} align="left">
        {cardsCount}
      </TableCell>
      <TableCell sx={{ width: '22%' }} align="left">
        {dayjs(updated).format('DD.MM.YYYY')}
      </TableCell>
      <TableCell sx={{ width: '22%' }} align="left">
        {user_name}
      </TableCell>
      <TableCell sx={{ width: '22%' }} className={s.icons} align="left">
        <ChangePacks id={id} userId={userId} name={name} />
      </TableCell>
    </TableRow>
  )
}
