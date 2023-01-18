import * as React from 'react'
import { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'

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

export const CardsPack = () => {
  const pack = useAppSelector(packSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const [page, setPage] = useState(useAppSelector(pageSelector))
  const [pageCount, setPageCount] = useState(useAppSelector(pageCountSelector))
  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setPageCount(newCount)
  }
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPacks({ filter: { page, pageCount } }))
  }, [page, pageCount])

  const onClick = () => {
    dispatch(addPackTC('Nikita'))
  }

  return (
    <div className={s.container}>
      <button onClick={onClick}>add pack</button>
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
          <ErrorSnackbar />
          <TableBody>
            {pack?.cardPacks?.map((el, i) => (
              <TableRow
                key={`${el._id}-${i}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {el.name}
                </TableCell>
                <TableCell align="right">{el.cardsCount}</TableCell>
                <TableCell align="right">{el.updated}</TableCell>
                <TableCell align="right">{el.created}</TableCell>
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
