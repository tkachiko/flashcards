import React, { useEffect } from 'react'

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
import { SuperTableHead } from '../../common/components/SuperTable/SuperTableHead/SuperTableHead'
import styleContainer from '../../common/styles/Container.module.scss'
import { isMyPackSelector } from '../packs/cardsPack-reducer'

import { Card } from './Card'
import { CardControls } from './cardControls/CardControls'
import { fetchCards } from './cards-reducer'
import style from './Cards.module.scss'
import { EmptyPack } from './emptyPack/EmptyPack'

export const Cards = () => {
  const { cardsPack_id } = useParams()
  const { cardsData, packId } = useAppSelector((state: RootStateType) => state.cards)
  const isMyPack = useAppSelector(isMyPackSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (packId) {
      dispatch(
        fetchCards({
          cardsPack_id: packId,
          pageCount: 10,
          answer: '',
        })
      )
    } else {
      cardsPack_id &&
        dispatch(
          fetchCards({
            cardsPack_id,
            pageCount: 10,
            answer: '',
          })
        )
    }
  }, [])

  console.log(isMyPack)

  return (
    <div>
      <div className={`${style.container} ${styleContainer.container}`}>
        <ErrorSnackbar />
        <Back2Packs />
        {cardsData.cards.length > 0 ? (
          <>
            <SuperTableHead />
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
                    cardsData.cards.map(card => {
                      return (
                        <TableRow
                          key={card._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <Card
                            answer={card.answer}
                            question={card.question}
                            grade={card.grade}
                            updated={card.updated}
                          />
                          {/*{isMyPack && (*/}
                          <TableCell align="center">
                            <CardControls
                              id={card._id}
                              question={card.question}
                              answer={card.answer}
                            />
                          </TableCell>
                          {/*)}*/}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <EmptyPack />
        )}
      </div>
    </div>
  )
}
