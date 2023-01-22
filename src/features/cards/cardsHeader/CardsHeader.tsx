import React from 'react'

import Button from '@mui/material/Button'

import { appStatusSelector } from '../../../app/app-reducer'
import { RootStateType, useAppDispatch, useAppSelector } from '../../../app/store'
import { isMyPackSelector } from '../../packs/cardsPack-reducer'
import { createCard } from '../cards-reducer'

import style from './CardsHeader.module.scss'

export const CardsHeader = () => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const isMyPack = useAppSelector(isMyPackSelector)
  const { cardsData, packId } = useAppSelector((state: RootStateType) => state.cards)

  const dispatch = useAppDispatch()

  const onCreateCardHandler = () => {
    dispatch(
      createCard({
        card: {
          cardsPack_id: packId,
          pageCount: 10,
        },
      })
    )
  }

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
