import React from 'react'

import { useAppDispatch } from '../../../../app/store'
import reset from '../../../../assets/images/reset.svg'

import style from './ResetFilters.module.scss'

export type ResetFiltersType = {
  reset: () => void
}

export const ResetFilters = (props: ResetFiltersType) => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    props.reset()
  }

  return (
    <div className={style.wrapper}>
      <img onClick={onClickHandler} className={style.img} src={reset} />
    </div>
  )
}
