import React, { FC, useState } from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import defaultAva from '../../../assets/images/person.png'
import { ChangePacks } from '../ChangePacks/ChangePacks'

import style from './PacksControls.module.scss'

import { PATH } from 'app/routes/routes'
import { useAppDispatch, useAppSelector } from 'app/store'
import { setPackId } from 'features/cards/cards-reducer'

type PacksControlsType = {
  id: string
  name: string
  cardsCount: number
  updated: string
  user_name: string
  userId: string
  deckCover: string
}
export const PacksControls: FC<PacksControlsType> = ({
  id,
  name,
  user_name,
  userId,
  updated,
  cardsCount,
  deckCover,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isAvaBroken, setIsAvaBroken] = useState(false)
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
        <div className={style.tableCell}>
          <img src={isAvaBroken ? defaultAva : deckCover} className={style.image} />{' '}
          <span className={style.packName}>{name}</span>
        </div>
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
      <TableCell sx={{ width: '12%' }} align="left">
        <ChangePacks cardscount={cardsCount} id={id} userId={userId} name={name} />
      </TableCell>
    </TableRow>
  )
}
