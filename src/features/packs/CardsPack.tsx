import * as React from 'react'
import { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { NotFoundSearching } from '../../common/components/NotFoundSearching/NotFoundSearching'
import { SuperPagination } from '../../common/components/SuperPagination/SuperPagination'
import { SuperTableHeader } from '../../common/components/SuperTable/SuperTableHead/SuperTableHeader'

import {
  cardPacksTotalCountSelector,
  fetchPacks,
  idSearchSelector,
  maxCardsCountSelector,
  minCardsCountSelector,
  packNameSearchSelector,
  packSelector,
  packsListTableNames,
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
  const [searchParams, setSearchParams] = useSearchParams()
  const pack = useAppSelector(packSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const page = useAppSelector(pageSelector)
  const packNameSearch = useAppSelector(packNameSearchSelector)
  const [pageCount, setPageCount] = useState(useAppSelector(pageCountSelector))
  const [search, setSearch] = useState<string>(searchParams.get('packName') || packNameSearch)
  const debouncedSearch = useDebounce<string>(search, 500)
  const searchId = useAppSelector(idSearchSelector)
  const dispatch = useAppDispatch()
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const [value, setValue] = useState<number[]>([
    Number(searchParams.get('min')) || minCardsCount,
    Number(searchParams.get('max')) || maxCardsCount,
  ])

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(setPageAC({ page: newPage }))
    setPageCount(newCount)
    setSearchParams({
      page: newPage.toString(),
      pageCount: newCount.toString(),
      packName: packNameSearch,
      user_id: searchId,
      min: value[0].toString(),
      max: value[1].toString(),
    })
    dispatch(
      fetchPacks({
        page: newPage,
        pageCount: newCount,
        packName: packNameSearch,
        user_id: searchId,
        min: value[0],
        max: value[1],
      })
    )
  }

  const handleChangeSearch = (search: string) => {
    setSearch(search)
    dispatch(setPackNameAC({ packName: search }))
    setSearchParams({
      page: page.toString(),
      pageCount: pageCount.toString(),
      user_id: searchId,
      packName: search,
      min: value[0].toString(),
      max: value[1].toString(),
    })
    dispatch(
      fetchPacks({
        page,
        pageCount,
        packName: search,
        user_id: searchId,
        min: value[0],
        max: value[1],
      })
    )
  }

  const handleParams = (
    page: number,
    pageCount: number,
    search: string,
    user_id: string,
    min: number,
    max: number
  ) => {
    setSearchParams({
      page: page.toString(),
      pageCount: pageCount.toString(),
      search,
      user_id,
      min: min.toString(),
      max: max.toString(),
    })
  }

  const change = (value: number | number[]) => {
    setValue(value as number[])
  }
  const changeCommitted = (value: number | number[]) => {
    const min = Array.isArray(value) ? value[0] : value
    const max = Array.isArray(value) ? value[1] : value

    setValue([min, max])
    dispatch(setPageAC({ page: 1 }))
    setSearchParams({
      page: '1',
      pageCount: pageCount.toString(),
      packName: search,
      user_id: searchId,
      min: min.toString(),
      max: max.toString(),
    })
    dispatch(
      fetchPacks({ page: 1, pageCount, packName: packNameSearch, user_id: searchId, min, max })
    )
  }

  useEffect(() => {
    setValue([
      Number(searchParams.get('min')) || minCardsCount,
      Number(searchParams.get('max')) || maxCardsCount,
    ])
  }, [minCardsCount, maxCardsCount])

  const resetFilters = () => {
    dispatch(setPageAC({ page: 1 }))
    dispatch(setPackNameAC({ packName: '' }))
    setSearch('')
    setValue([minCardsCount, maxCardsCount])
    setSearchParams({
      page: '1',
      pageCount: pageCount.toString(),
      user_id: searchId,
      packName: '',
    })
    dispatch(fetchPacks({}))
  }

  const sortPacks = (newSort: string) => {
    searchParams.set('sortPacks', newSort)
    setSearchParams(searchParams)
    dispatch(
      fetchPacks({
        sortPacks: newSort,
        pageCount,
        packName: packNameSearch,
        min: value[0],
        max: value[1],
        user_id: searchId,
      })
    )
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    console.log(params)

    dispatch(
      fetchPacks({
        page: +params.page ? +params.page : 1,
        pageCount: +params.pageCount ? +params.pageCount : 4,
        packName: params.packName,
        user_id: params.user_id,
        min: params.min,
        max: params.max,
      })
    )
  }, [])

  return (
    <div className={s.container}>
      <ErrorSnackbar />
      <HeaderPacks />
      <FiltersField
        resetFilters={resetFilters}
        page={page}
        pageCount={pageCount}
        search={search}
        setSearch={setSearch}
        debouncedSearch={debouncedSearch}
        handleChangeSearch={handleChangeSearch}
        handleParams={handleParams}
        searchId={searchId}
        value={value}
        changeValue={change}
        changeValueCommitted={changeCommitted}
      />
      {pack.cardPacks.length ? (
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650, border: '1px solid #D9D9D9' }} aria-label="simple table">
              <SuperTableHeader
                titles={packsListTableNames}
                cardPack_id={null}
                sortPacks={sortPacks}
              />
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
            itemsTotalCount={cardPacksTotalCount}
          />
        </div>
      ) : (
        <NotFoundSearching packName={packNameSearch} />
      )}
    </div>
  )
}
