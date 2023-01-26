import React, { FC } from 'react'

import { Slider, SliderProps } from '@mui/material'

import { appStatusSelector } from '../../../app/app-reducer'
import { useAppSelector } from '../../../app/store'
import {
  maxCardsCountSelector,
  minCardsCountSelector,
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
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const loadingStatus = useAppSelector(appStatusSelector)

  const change = (event: React.SyntheticEvent | Event, newValue: any) => {
    props.changeValue(newValue)
  }
  const changeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    props.changeValueCommitted(newValue)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <span>Number of cards</span>
      </div>
      <div className={style.slider}>
        <span>{typeof props.value === 'object' ? props.value[0] : 0}</span>
        <Slider
          disabled={loadingStatus === 'loading'}
          sx={{ width: 150 }}
          color={'primary'}
          onChange={change}
          onChangeCommitted={changeCommitted}
          value={props.value}
          min={minCardsCount}
          max={maxCardsCount}
          valueLabelDisplay={'auto'}
          disableSwap
        />
        <span>{typeof props.value === 'object' ? props.value[1] : 100}</span>
      </div>
    </div>
  )
}
