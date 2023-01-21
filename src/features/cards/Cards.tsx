import React, { useEffect } from 'react'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useParams } from 'react-router-dom'

import { RootStateType, useAppDispatch, useAppSelector } from '../../app/store'
import { Back2Packs } from '../../common/components/Back2Packs/Back2Packs'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import styleContainer from '../../common/styles/Container.module.scss'
import { isMyPackSelector } from '../packs/cardsPack-reducer'

import { CardControls } from './cardControls/CardControls'
import { createCardTh, fetchCardsTh } from './cards-reducer'
import style from './Cards.module.scss'

export const Cards = () => {
  const { cardsPack_id } = useParams()
  const { cardsData, packId } = useAppSelector((state: RootStateType) => state.cards)
  const isMyPack = useAppSelector(isMyPackSelector)
  const dispatch = useAppDispatch()

  console.log('cardsData: ', cardsData)
  console.log('cardsPack_id: ', cardsPack_id)
  console.log('packId: ', packId)

  useEffect(() => {
    if (packId) {
      dispatch(
        fetchCardsTh({
          cardsPack_id: packId,
          pageCount: 5,
          cardAnswer: '',
        })
      )
    } else {
      cardsPack_id &&
        dispatch(
          fetchCardsTh({
            cardsPack_id,
            pageCount: 5,
            cardAnswer: '',
          })
        )
    }
  }, [])

  const onCreateCardHandler = () => {
    dispatch(
      createCardTh({
        card: {
          cardsPack_id: packId,
        },
      })
    )
  }

  return (
    <div className={`${style.container} ${styleContainer.container}`}>
      <ErrorSnackbar />
      <Back2Packs />
      <div className={style.header}>
        <h2>My pack</h2>
        <Button
          variant={'contained'}
          type={'button'}
          fullWidth
          disableRipple
          // disabled={status === 'loading'}
          className={style.button}
          onClick={onCreateCardHandler}
        >
          Add new card
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={style.tHead}>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Answer</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardsData.cards &&
              cardsData.cards.map(card => (
                <TableRow key={card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {card.question}
                  </TableCell>
                  <TableCell align="right">{card.answer}</TableCell>
                  <TableCell align="right">{card.updated.slice(0, -14)}</TableCell>
                  <TableCell align="right">{card.grade}</TableCell>
                  {/*{isMyPack && (*/}
                  <TableCell align="center">
                    <CardControls id={card._id} />
                  </TableCell>
                  {/*)}*/}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*<SuperPagination*/}
      {/*  page={page}*/}
      {/*  onChange={onChangePagination}*/}
      {/*  pageCount={pageCount}*/}
      {/*  cardPacksTotalCount={cardsTotalCount}*/}
      {/*/>*/}
    </div>
  )
}
