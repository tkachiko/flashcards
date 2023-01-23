import * as React from 'react'
import { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useDebounce } from 'usehooks-ts'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { NotFoundSearching } from '../../common/components/NotFoundSearching/NotFoundSearching'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTableHead } from '../../common/components/SuperTable/SuperTableHead/SuperTableHead'

import {
  cardPacksTotalCountSelector,
  fetchPacks,
  isMyPackSelector,
  packNameSelector,
  packSelector,
  pageCountSelector,
  pageSelector,
  setPackNameAC,
  setPageAC,
} from './cardsPack-reducer'
import s from './CardsPack.module.scss'
import { FiltersField } from './FiltersField/FiltersField'
import { HeaderPacks } from './headerPacks/HeaderPacks'
import { PacksControls } from './packsControls/PacksControls'

export const CardsPack = () => {
  const isMyPack = useAppSelector(isMyPackSelector)
  const pack = useAppSelector(packSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const page = useAppSelector(pageSelector)
  const packName = useAppSelector(packNameSelector)
  const [pageCount, setPageCount] = useState(useAppSelector(pageCountSelector))
  const [search, setSearch] = useState<string>(packName)
  const debouncedSearch = useDebounce<string>(search, 500)

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(setPageAC({ page: newPage }))
    setPageCount(newCount)
  }
  const dispatch = useAppDispatch()

  const handleChangeSearch = (search: string) => {
    setSearch(search)
    dispatch(setPackNameAC({ packName: search }))
  }

  useEffect(() => {
    dispatch(fetchPacks({ page, pageCount, packName }))
  }, [page, pageCount, debouncedSearch, isMyPack])

  return (
    <div className={s.container}>
      <ErrorSnackbar />
      <HeaderPacks />
      <FiltersField
        search={search}
        setSearch={setSearch}
        debouncedSearch={debouncedSearch}
        handleChangeSearch={handleChangeSearch}
      />
      {pack.cardPacks.length ? (
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650, border: '1px solid #D9D9D9' }} aria-label="simple table">
              <SuperTableHead />
              <TableBody>
                {pack?.cardPacks?.map(el => {
                  return (
                    <PacksControls
                      key={el._id}
                      id={el._id}
                      name={el.name}
                      cardsCount={el.cardsCount}
                      updated={el.updated}
                      user_name={el.user_name}
                      userId={el.user_id}
                    />
                  )
                })}
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
