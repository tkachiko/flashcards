import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import { RootStateType, useAppDispatch, useAppSelector } from '../../app/store'
import { Back2Packs } from '../../common/components/Back2Packs/Back2Packs'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTableHeader } from '../../common/components/SuperTable/SuperTableHead/SuperTableHeader'
import styleContainer from '../../common/styles/Container.module.scss'
import { SearchField } from '../packs/FiltersField/SearchField/SearchField'

import { Card } from './card/Card'
import { CardControls } from './cardControls/CardControls'
import {
  cardNameSelector,
  cardsListTableNames,
  cardsTotalCountSelector,
  createCard,
  fetchCards,
  pageCardsSelector,
  pageCountCardsSelector,
  setCardPage,
  setSearchCardName,
} from './cards-reducer'
import style from './Cards.module.scss'
import { CardsHeader } from './cardsHeader/CardsHeader'
import { EmptyPack } from './emptyPack/EmptyPack'

export const Cards = () => {
  const { cardsPack_id } = useParams()
  const { cardsData, packId } = useAppSelector((state: RootStateType) => state.cards)
  const { cards } = cardsData
  const cardNameSearch = useAppSelector(cardNameSelector)
  const [search, setSearch] = useState<string>(cardNameSearch)
  const debouncedSearch = useDebounce<string>(search, 500)
  const page = useAppSelector(pageCardsSelector)
  const [pageCount, setPageCount] = useState(useAppSelector(pageCountCardsSelector))
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)

  const dispatch = useAppDispatch()

  const onCreateCardHandler = () => {
    dispatch(
      createCard({
        card: {
          cardsPack_id: packId,
          pageCount: 10,
        },
      })
    )
  }

  const handleChangeSearch = (search: string) => {
    setSearch(search)
    dispatch(setSearchCardName(search))
  }

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(setCardPage(newPage))
    setPageCount(newCount)
  }

  useEffect(() => {
    if (packId) {
      dispatch(
        fetchCards({
          cardsPack_id: packId,
          page,
          pageCount,
          answer: '',
          cardQuestion: debouncedSearch,
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
  }, [page, pageCount, debouncedSearch])

  console.log(cards)

  return (
    <div>
      <div className={`${style.container} ${styleContainer.container}`}>
        <ErrorSnackbar />
        <Back2Packs />
        {cards && cards.length > 0 ? (
          <>
            <CardsHeader onCreateCardHandler={onCreateCardHandler} />
            <SearchField search={search} handleChangeSearch={handleChangeSearch} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <SuperTableHeader titles={cardsListTableNames} cardPack_id={packId} />
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
            <SuperPagination
              page={page}
              onChange={onChangePagination}
              pageCount={pageCount}
              itemsTotalCount={cardsTotalCount}
            />
          </>
        ) : (
          <EmptyPack onCreateCardHandler={onCreateCardHandler} />
        )}
      </div>
    </div>
  )
}
