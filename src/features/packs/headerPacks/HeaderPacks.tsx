import React, { useState } from 'react'

import Button from '@mui/material/Button'

import { appStatusSelector } from '../../../app/app-reducer'
import { useAppSelector } from '../../../app/store'
import { AddModals } from '../../modal/AddModal'

import s from './HeaderPacks.module.scss'

export const HeaderPacks = () => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className={s.header}>
      <h3>Packs List</h3>
      <AddModals
        isModalAddOpen={open}
        setIsModalOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <Button
        type={'submit'}
        variant={'contained'}
        className={s.button}
        onClick={handleOpen}
        disabled={loadingStatus === 'loading'}
      >
        Add new pack
      </Button>
    </div>
  )
}
