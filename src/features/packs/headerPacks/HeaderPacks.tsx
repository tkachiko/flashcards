import React from 'react'

import Button from '@mui/material/Button'

import { appStatusSelector } from '../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { addPackTC } from '../cardsPack-reducer'

import s from './HeaderPacks.module.scss'

export const HeaderPacks = () => {
  const dispatch = useAppDispatch()
  const loadingStatus = useAppSelector(appStatusSelector)
  const onClick = () => {
    dispatch(addPackTC({ cardsPack: { name: 'New filter' } }))
  }

  return (
    <div className={s.header}>
      <h3>Packs List</h3>
      <Button
        type={'submit'}
        variant={'contained'}
        className={s.button}
        onClick={onClick}
        disabled={loadingStatus === 'loading'}
      >
        Add new pack
      </Button>
    </div>
  )
}
