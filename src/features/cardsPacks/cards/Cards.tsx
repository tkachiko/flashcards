import React, { useCallback, useEffect } from 'react'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { Back2Packs } from '../../../common/components/Back2Packs/Back2Packs'
import styleContainer from '../../../common/styles/Container.module.scss'

import { createCardTC, fetchCardsTC } from './cards-reducer'
import style from './Cards.module.scss'

export const Cards = () => {
  const { cardsData } = useAppSelector(state => state.cards)
  const dispatch = useAppDispatch()

  const addNewCard = useCallback(() => {
    dispatch(
      createCardTC({
        card: {
          cardsPack_id: '63c42cb2bbf2ab12e09c6f1f',
        },
      })
    )
  }, [dispatch])

  useEffect(() => {
    dispatch(
      fetchCardsTC({
        cardsPack_id: '63c42cb2bbf2ab12e09c6f1f',
        pageCount: 5,
        cardAnswer: '',
      })
    )
  }, [])

  return (
    <div className={`${style.container} ${styleContainer.container}`}>
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
                  <TableCell
                    onClick={() => {
                      alert('EDITED')
                    }}
                    align="right"
                  >
                    EDIT
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      alert('DELETED')
                    }}
                    align="right"
                  >
                    DELETE
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={addNewCard}>Add new card</Button>
    </div>
  )
}
