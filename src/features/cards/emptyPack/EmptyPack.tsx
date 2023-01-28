import React, { useState } from 'react'

import Button from '@mui/material/Button'

import { userIdSelector } from '../../profile/profile-reducer'
import { packUserIdSelector } from '../cards-reducer'

import style from './EmptyPack.module.scss'

import { appStatusSelector } from 'app/app-reducer'
import { useAppSelector } from 'app/store'
import { AddModalCard } from 'features/modal/AddModalCard'

export const EmptyPack = () => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const packUserId = useAppSelector(packUserIdSelector)
  const userId = useAppSelector(userIdSelector)

  if (packUserId === userId) {
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
  } else {
    return (
      <div className={style.container}>
        <p>This pack is empty. Click add new card to fill this pack</p>
      </div>
    )
  }
}
