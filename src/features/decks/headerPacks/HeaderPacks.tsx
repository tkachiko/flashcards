import React from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../app/store'
import style from '../../auth/login/Login.module.scss'
import { addPackTC } from '../cardsPack-reducer'
import s from '../CardsPack.module.scss'

export const HeaderPacks = () => {
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(addPackTC('New filter'))
  }

  return (
    <div className={s.header}>
      <h3>Packs List</h3>
      <Button variant={'contained'} className={s.button} onClick={onClick}>
        Add new pack
      </Button>
    </div>
  )
}
