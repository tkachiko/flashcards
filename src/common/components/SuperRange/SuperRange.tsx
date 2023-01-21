import React, { FC, useState } from 'react'

import { Slider } from '@mui/material'
import {
  fetchPacks
} from '../../../features/packs/cardsPack-reducer'
import style from '../SuperRange/SuperRange.module.scss'

type SuperRangePropsType = {
  min: number
  max: number
  value: number[]
  changeValue: (value: number | number[]) => void
  changeValueCommitted: (value: number | number[]) => void
}

export const SuperRange: FC<SliderProps & SuperRangePropsType> = props => {
  const change = (event: React.SyntheticEvent | Event, value: number | number[]) => {
    props.changeValue(value)
  }
  const changeCommitted = (event: React.SyntheticEvent | Event, value: number | number[]) => {
    const min = Array.isArray(value) ? value[0] : value
    const max = Array.isArray(value) ? value[1] : value

    dispatch(fetchPacks({ page: 1, pageCount: 10, min, max }))
  }

  return (
    <div className={style.wrapper}>
      <span>{props.value[0]}</span>
      <Slider
        sx={{ width: 150 }}
        color={'primary'}
        onChange={change}
        onChangeCommitted={changeCommitted}
        value={value}
        max={maxCardsCount}
        valueLabelDisplay={'auto'}
      />
      <span id={'value-2'}>{value[1]}</span>
    </div>
  )
}
