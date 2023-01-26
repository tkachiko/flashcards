import React, { useEffect, useState } from 'react'

import style from '../FiltersField/FiltersField.module.scss'

import { ResetFilters } from './ResetFilters/ResetFilters'
import { SearchField } from './SearchField/SearchField'
import { SelectPackField } from './SelectPackField/SelectPackField'

import { useAppDispatch, useAppSelector } from 'app/store'
import { SuperRange } from 'common/components/SuperRange/SuperRange'
import {
  fetchPacks,
  maxCardsCountSelector,
  minCardsCountSelector,
  pageCountSelector,
  setPackNameAC,
} from 'features/packs/cardsPack-reducer'

type FiltersFieldPropsType = {
  search: string
  debouncedSearch: string
  setSearch: (search: string) => void
  handleChangeSearch: (search: string) => void
}

export const FiltersField = (props: FiltersFieldPropsType) => {
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const pageCount = useAppSelector(pageCountSelector)

  const dispatch = useAppDispatch()

  const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount])

  const change = (value: number | number[]) => {
    setValue(value as number[])
  }
  const changeCommitted = (value: number | number[]) => {
    const min = Array.isArray(value) ? value[0] : value
    const max = Array.isArray(value) ? value[1] : value

    setValue([min, max])
    dispatch(fetchPacks({ min, max, packName: props.debouncedSearch, pageCount }))
  }

  const handleChangeSearch = (search: string) => {
    props.handleChangeSearch(search)
  }

  const resetFilters = () => {
    setValue([minCardsCount, maxCardsCount])
    props.setSearch('')
    dispatch(setPackNameAC({ packName: '' }))
  }

  useEffect(() => {
    setValue([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])

  return (
    <div className={style.wrapper}>
      <SearchField search={props.search} handleChangeSearch={handleChangeSearch} />
      <SelectPackField />
      <SuperRange
        min={minCardsCount}
        max={maxCardsCount}
        value={value}
        changeValue={change}
        changeValueCommitted={changeCommitted}
      />
      <ResetFilters reset={resetFilters} />
    </div>
  )
}
