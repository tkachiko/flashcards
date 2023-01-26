import React, { useState } from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { appStatusSelector } from '../../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { CardsTableHeaderDataType, fetchCards } from '../../../../features/cards/cards-reducer'
import { TableHeaderDataType } from '../../../../features/packs/cardsPack-reducer'
import style from '../SuperTableHead/SuperTableHead.module.scss'

type SuperTableHeaderPropsType = {
  titles: TableHeaderDataType[] | CardsTableHeaderDataType[]
  cardPack_id: string | null
  sortPacks?: (newSort: string) => void
}

export const SuperTableHeader = (props: SuperTableHeaderPropsType) => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()
  const [sort, setSort] = useState<string>('down')

  const pureChange = (sort: string, down: string, up: string) => {
    return sort === down ? up : down
  }

  const onChangeSort = (newSort: string) => {
    setSort(newSort)
    props.titles[0].name === 'Name'
      ? sortPacks(newSort)
      : dispatch(fetchCards({ cardsPack_id: props.cardPack_id, sortCards: newSort }))
  }

  const sortPacks = (newSort: string) => {
    props.sortPacks ? props.sortPacks(newSort) : ''
  }

  return (
    <TableHead>
      <TableRow>
        {props.titles.map(el => {
          const up = '0' + el.sortName
          const down = '1' + el.sortName

          return (
            <TableCell key={el.name} className={style.name} align="left">
              {el.name}
              <TableSortLabel
                active={sort.slice(1) === el.sortName}
                direction={sort.includes('0') ? 'desc' : 'asc'}
                disabled={loadingStatus === 'loading'}
                onClick={() => {
                  onChangeSort(pureChange(sort, down, up))
                }}
              ></TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}
