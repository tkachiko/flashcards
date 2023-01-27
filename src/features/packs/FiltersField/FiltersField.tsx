import React from 'react'

import style from '../FiltersField/FiltersField.module.scss'

import { ResetFilters } from './ResetFilters/ResetFilters'
import { SearchField } from './SearchField/SearchField'
import { SelectPackField } from './SelectPackField/SelectPackField'

import { SuperRange } from 'common/components/SuperRange/SuperRange'

type FiltersFieldPropsType = {
  search: string
  debouncedSearch: string
  setSearch: (search: string) => void
  handleChangeSearch: (search: string) => void
  searchId: string
  page: number
  pageCount: number
  value: number[]
  changeValue: (value: number | number[]) => void
  changeValueCommitted: (value: number | number[]) => void
  resetFilters: () => void
}

export const FiltersField = (props: FiltersFieldPropsType) => {
  const change = (value: number | number[]) => {
    props.changeValue(value)
  }
  const changeCommitted = (value: number | number[]) => {
    props.changeValueCommitted(value)
  }

  const handleChangeSearch = (search: string) => {
    props.handleChangeSearch(search)
  }

  const resetFilters = () => {
    props.resetFilters()
  }

  const min = typeof props.value === 'object' ? props.value[0] : 0
  const max = typeof props.value === 'object' ? props.value[1] : 100

  return (
    <div className={style.wrapper}>
      <SearchField search={props.search} handleChangeSearch={handleChangeSearch} />
      <SelectPackField />
      <SuperRange
        min={min}
        max={max}
        value={props.value}
        changeValue={change}
        changeValueCommitted={changeCommitted}
      />
      <ResetFilters reset={resetFilters} />
    </div>
  )
}
