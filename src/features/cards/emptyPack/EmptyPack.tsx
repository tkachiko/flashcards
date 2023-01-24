import React, { FC } from 'react'

import Button from '@mui/material/Button'

import { appStatusSelector } from '../../../app/app-reducer'
import { useAppSelector } from '../../../app/store'

import style from './EmptyPack.module.scss'

type PropsType = {
  onCreateCardHandler: () => void
}

export const EmptyPack: FC<PropsType> = ({ onCreateCardHandler }) => {
  const loadingStatus = useAppSelector(appStatusSelector)

  return (
    <div className={style.container}>
      <p>This pack is empty. Click add new card to fill this pack</p>
      <Button
        variant={'contained'}
        type={'button'}
        fullWidth
        disableRipple
        disabled={loadingStatus === 'loading'}
        className={style.button}
        onClick={onCreateCardHandler}
      >
        Add new card
      </Button>
    </div>
  )
}
