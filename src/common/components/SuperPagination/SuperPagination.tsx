import React, { ChangeEvent } from 'react'

import Pagination from '@mui/material/Pagination'

import style from '../SuperPagination/SuperPagination.module.scss'
import { SuperSelect } from '../SuperSelect/SuperSelect'

type SuperPaginationType = {
  page: number
  onChange: (page: number, pageCount: number) => void
  pageCount: number
  cardPacksTotalCount: number
}

export const SuperPagination = (props: SuperPaginationType) => {
  const onChangePagination = (event: ChangeEvent<unknown>, newPage: number) => {
    props.onChange(newPage, props.pageCount)
  }
  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    props.onChange(props.page, +event.currentTarget.value)
  }

  return (
    <div className={style.wrapper}>
      <Pagination
        color={'primary'}
        count={Math.ceil(props.cardPacksTotalCount / props.pageCount)}
        page={props.page}
        shape="rounded"
        onChange={onChangePagination}
      />
      <div className={style.selectBlock}>
        <span className={style.text}>Show</span>
        <SuperSelect
          value={props.pageCount}
          options={[
            { id: 5, value: 5 },
            { id: 10, value: 10 },
            { id: 20, value: 20 },
          ]}
          onChange={onChangeSelect}
          className={style.text}
        />
        <span className={style.text}>Cards per page</span>
      </div>
    </div>
  )
}