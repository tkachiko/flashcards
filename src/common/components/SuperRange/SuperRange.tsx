import React, { FC } from 'react'

import { Slider, SliderProps } from '@mui/material'

import { appStatusSelector } from '../../../app/app-reducer'
import { useAppSelector } from '../../../app/store'
import style from '../SuperRange/SuperRange.module.scss'

type SuperRangePropsType = {
  min: number
  max: number
  value: number[]
  changeValue: (value: number | number[]) => void
  changeValueCommitted: (value: number | number[]) => void
}

export const SuperRange: FC<SliderProps & SuperRangePropsType> = props => {
  const loadingStatus = useAppSelector(appStatusSelector)

  const change = (event: React.SyntheticEvent | Event, value: number | number[]) => {
    props.changeValue(value)
  }
  const changeCommitted = (event: React.SyntheticEvent | Event, value: number | number[]) => {
    props.changeValueCommitted(value)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <span>Number of cards</span>
      </div>
      <div className={style.slider}>
        <span>{props.value[0]}</span>
        <Slider
          disabled={loadingStatus === 'loading'}
          sx={{ width: 150 }}
          color={'primary'}
          onChange={change}
          onChangeCommitted={changeCommitted}
          value={props.value}
          min={props.min}
          max={props.max}
          valueLabelDisplay={'auto'}
        />
        <span>{props.value[1]}</span>
      </div>
    </div>
  )
}
