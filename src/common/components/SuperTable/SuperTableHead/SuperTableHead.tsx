import React, { useState } from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { appStatusSelector } from '../../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { fetchPacks, packsListTableNames } from '../../../../features/packs/cardsPack-reducer'
import style from '../SuperTableHead/SuperTableHead.module.scss'

export const SuperTableHead = () => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()
  const [sort, setSort] = useState<string>('down')

  const pureChange = (sort: string, down: string, up: string) => {
    return sort === down ? up : down
  }

  const onChangeSort = (newSort: string) => {
    setSort(newSort)
    dispatch(fetchPacks({ sortPacks: newSort }))
  }

  return (
    <TableHead>
      <TableRow>
        {packsListTableNames.map(el => {
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
