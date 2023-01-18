import React from 'react'

import style from '../FiltersField/FiltersField.module.scss'

import { SearchField } from './SearchField/SearchField'
import { SelectPackField } from './SelectPackField/SelectPackField'

export const FiltersField = () => {
  return (
    <div className={style.wrapper}>
      <SearchField />
      <SelectPackField />
    </div>
  )
}
