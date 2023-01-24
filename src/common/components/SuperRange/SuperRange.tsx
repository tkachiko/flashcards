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

let beforeChange: any = null

export const SuperRange: FC<SliderProps & SuperRangePropsType> = props => {
  const loadingStatus = useAppSelector(appStatusSelector)

  const change = (event: React.SyntheticEvent | Event, newValue: any) => {
    if (!beforeChange) {
      beforeChange = [...props.value]
    }

    if (beforeChange[0] !== newValue[0] && beforeChange[1] !== newValue[1]) {
      return
    }
    props.changeValue(newValue)
  }
  const changeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    props.changeValueCommitted(newValue)
    beforeChange = null
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
