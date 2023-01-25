import React, { FC, useState } from 'react'

import Button from '@mui/material/Button'

import { appStatusSelector } from '../../../app/app-reducer'
import { useAppSelector } from '../../../app/store'
import { AddModalCard } from '../../modal/AddModalCard'
import { isMyPackSelector } from '../../packs/cardsPack-reducer'
import { packNameSelector } from '../cards-reducer'

import style from './CardsHeader.module.scss'

export const CardsHeader = () => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const isMyPack = useAppSelector(isMyPackSelector)
  const packName = useAppSelector(packNameSelector)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className={style.header}>
      {isMyPack ? <h2>{packName}</h2> : <h2>{packName}</h2>}
      <AddModalCard
        isModalAddOpen={open}
        setIsModalOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <Button
        variant={'contained'}
        type={'button'}
        fullWidth
        disableRipple
        disabled={loadingStatus === 'loading'}
        className={style.button}
        onClick={handleOpen}
      >
        Add new card
      </Button>
    </div>
  )
}
