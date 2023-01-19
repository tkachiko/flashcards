import React, { FC, useState } from 'react'

import { Slider, SliderProps } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import {
  fetchPacks,
  maxCardsCountSelector,
  minCardsCountSelector,
} from '../../../features/decks/cardsPack-reducer'
import style from '../SuperRange/SuperRange.module.scss'

export const SuperRange: FC<SliderProps> = () => {
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)

  const dispatch = useAppDispatch()
  const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount])
  const change = (event: React.SyntheticEvent | Event, value: number | number[]) => {
    setValue(value as number[])
  }
  const changeCommitted = (event: React.SyntheticEvent | Event, value: number | number[]) => {
    const min = Array.isArray(value) ? value[0] : value
    const max = Array.isArray(value) ? value[1] : value

    dispatch(
      fetchPacks({
        filter: { page: 1, pageCount: 10, min, max },
      })
    )
  }

  console.log(value)

  return (
    <div className={style.wrapper}>
      <span id={'value-1'}>{value[0]}</span>
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
