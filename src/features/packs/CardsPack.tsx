import * as React from 'react'
import { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { NotFoundSearching } from '../../common/components/NotFoundSearching/NotFoundSearching'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTableHead } from '../../common/components/SuperTable/SuperTableHead/SuperTableHead'
import { setPackId } from '../cards/cards-reducer'

import {
  cardPacksTotalCountSelector,
  fetchPacks,
  maxCardsCountSelector,
  minCardsCountSelector,
  packNameSelector,
  packSelector,
  pageCountSelector,
  pageSelector,
} from './cardsPack-reducer'
import s from './CardsPack.module.scss'
import { ChangePacks } from './ChangePacks/ChangePacks'
import { FiltersField } from './FiltersField/FiltersField'
import { HeaderPacks } from './headerPacks/HeaderPacks'

export const CardsPack = () => {
  const pack = useAppSelector(packSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const [page, setPage] = useState(useAppSelector(pageSelector))
  const packName = useAppSelector(packNameSelector)
  const [pageCount, setPageCount] = useState(useAppSelector(pageCountSelector))
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setPageCount(newCount)
  }
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handlerOpenCards = (packId: string) => {
    if (packId) {
      dispatch(setPackId(packId))
      navigate(PATH.CARDS + `/${packId}`)
    }
  }

  useEffect(() => {
    dispatch(fetchPacks({ page, pageCount, packName, min: minCardsCount, max: maxCardsCount }))
  }, [page, pageCount])

  return (
    <div className={s.container}>
      <ErrorSnackbar />
      <HeaderPacks />
      <FiltersField />
      {pack.cardPacks.length ? (
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650, border: '1px solid #D9D9D9' }} aria-label="simple table">
              <SuperTableHead />
              <TableBody>
                {pack?.cardPacks?.map((el, i) => (
                  <TableRow
                    key={`${el._id}-${i}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      sx={{ cursor: 'pointer', width: '22%' }}
                      component="th"
                      scope="row"
                      onClick={() => handlerOpenCards(el._id)}
                    >
                      {el.name}
                    </TableCell>
                    <TableCell sx={{ width: '22%' }} align="left">
                      {el.cardsCount}
                    </TableCell>
                    <TableCell sx={{ width: '22%' }} align="left">
                      {dayjs(el.updated).format('DD.MM.YYYY')}
                    </TableCell>
                    <TableCell sx={{ width: '22%' }} align="left">
                      {el.user_name}
                    </TableCell>
                    <TableCell sx={{ width: '22%' }} className={s.icons} align="left">
                      <ChangePacks id={el._id} userId={el.user_id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <SuperPagination
            page={page}
            onChange={onChangePagination}
            pageCount={pageCount}
            cardPacksTotalCount={cardPacksTotalCount}
          />
        </div>
      ) : (
        <NotFoundSearching packName={packName} />
      )}
    </div>
  )
}
