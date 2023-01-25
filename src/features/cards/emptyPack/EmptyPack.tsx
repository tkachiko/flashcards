import React, {  useState } from 'react'
import Button from '@mui/material/Button'

import { appStatusSelector } from '../../../app/app-reducer'
import { useAppSelector } from '../../../app/store'
import { AddModalCard } from '../../modal/AddModalCard'

import style from './EmptyPack.module.scss'

export const EmptyPack = () => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className={style.container}>
      <p>This pack is empty. Click add new card to fill this pack</p>
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
