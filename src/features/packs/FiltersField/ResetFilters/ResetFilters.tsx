import React from 'react'

import style from './ResetFilters.module.scss'

import reset from 'assets/images/reset.svg'

export type ResetFiltersType = {
  reset: () => void
}

export const ResetFilters = (props: ResetFiltersType) => {
  const onClickHandler = () => {
    props.reset()
  }

  return (
    <div className={style.wrapper}>
      <div className={style.imgBlock}>
        <img onClick={onClickHandler} className={style.img} src={reset} alt={'reset'} />
      </div>
    </div>
  )
}
