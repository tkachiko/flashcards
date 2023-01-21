import * as React from 'react'
import { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate, useParams } from 'react-router-dom'

import { PATH } from '../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { setPackId } from '../cards/cards-reducer'
import { userIdSelector } from '../profile/profile-reducer'

import {
  addPackTC,
  cardPacksTotalCountSelector,
  fetchPacks,
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
  const [pageCount, setPageCount] = useState(useAppSelector(pageCountSelector))
  const userId = useAppSelector(userIdSelector)

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setPageCount(newCount)
  }
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchPacks({ filter: { page, pageCount, userId } }))
  }, [page, pageCount])

  const onClick = () => {
    dispatch(addPackTC('New filter'))
  }
  const handlerOpenCards = (cardsPack_id: string) => {
    if (cardsPack_id) {
      dispatch(setPackId(cardsPack_id))
      navigate(PATH.CARDS + `${cardsPack_id}`)
    }
  }

  return (
    <div className={s.container}>
      <ErrorSnackbar />
      <HeaderPacks />
      <FiltersField />
      <TableContainer
        sx={{
          filter:
            'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.1))',
        }}
      >
        <Table sx={{ minWidth: 650, border: '1px solid #D9D9D9' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pack?.cardPacks?.map((el, i) => (
              <TableRow
                key={`${el._id}-${i}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" onClick={() => handlerOpenCards(el._id)}>
                  {el.name}
                </TableCell>
                <TableCell align="right">{el.cardsCount}</TableCell>
                <TableCell align="right">{dayjs(el.updated).format('DD.MM.YYYY')}</TableCell>
                <TableCell align="right">{dayjs(el.created).format('DD.MM.YYYY')}</TableCell>
                <TableCell align="center">
                  <ChangePacks id={el._id} />
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
  )
}
