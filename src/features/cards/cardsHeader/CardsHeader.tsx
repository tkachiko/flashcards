import React, { FC } from 'react'

import Button from '@mui/material/Button'

import { appStatusSelector } from '../../../app/app-reducer'
import { useAppSelector } from '../../../app/store'
import { isMyPackSelector } from '../../packs/cardsPack-reducer'

import style from './CardsHeader.module.scss'

type PropsType = {
  onCreateCardHandler: () => void
}

export const CardsHeader: FC<PropsType> = ({ onCreateCardHandler }) => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const isMyPack = useAppSelector(isMyPackSelector)

  return (
    <div className={style.header}>
      {isMyPack ? <h2>My Pack</h2> : <h2>Friend&apos;s Pack</h2>}

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
