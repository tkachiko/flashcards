import React, { FC, useEffect, useState } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../app/store'
import Close from '../../assets/icons/close.svg'
import Delete from '../../assets/icons/Delete.svg'
import {
  deletePack,
  isNewCardPackAddedAC,
  isNewCardPackAddedSelector,
} from '../packs/cardsPack-reducer'
import style from '../packs/ChangePacks/ChangePacks.module.scss'

import { BasicModals } from './basicModals'
import s from './DeleteModal.module.scss'

type AddModalsType = {
  id: string
  name: string
}
export const DeleteModal: FC<AddModalsType> = ({ id, name }) => {
  const dispatch = useAppDispatch()
  const isNewCardPackAdded = useAppSelector(isNewCardPackAddedSelector)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handlerOnClickCancel = () => {
    setOpen(false)
  }
  const handlerOnClickAddPack = () => {
    dispatch(deletePack({ id: id }))
  }

  useEffect(() => {
    if (isNewCardPackAdded) {
      setOpen(false)
      dispatch(isNewCardPackAddedAC({ isNewCardPackAdded: false }))
    }
  }, [isNewCardPackAdded])

  return (
    <>
      <img className={style.icon} onClick={handleOpen} src={Delete} alt={'Delete'} />
      <BasicModals isOpen={open} setIsModalOpen={setOpen} handleClose={handleClose}>
        <div className={s.container}>
          <div className={s.headerContainer}>
            <p className={s.title}>Delete Pack</p>
            <img onClick={handlerOnClickCancel} className={s.img} src={Close} alt={'close'} />
          </div>
          <p>Do you really want to remove {<b>{name}</b>}? All cards will be deleted.</p>
          <div className={s.buttonContainer}>
            <Button onClick={handlerOnClickCancel} variant="text" className={s.buttonCancel}>
              Cancel
            </Button>
            <Button
              onClick={handlerOnClickAddPack}
              type={'submit'}
              variant={'contained'}
              className={s.buttonDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </BasicModals>
    </>
  )
}
