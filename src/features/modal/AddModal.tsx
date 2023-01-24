import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../app/store'
import Close from '../../assets/icons/close.svg'
import {
  addPackTC,
  isNewCardPackAddedAC,
  isNewCardPackAddedSelector,
} from '../packs/cardsPack-reducer'

import s from './AddandUpdateModal.module.scss'
import { BasicModals } from './basicModals'
type AddModalsType = {
  isModalAddOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  handleOpen: () => void
  handleClose: () => void
}
export const AddModals: FC<AddModalsType> = ({ isModalAddOpen, setIsModalOpen, handleClose }) => {
  const dispatch = useAppDispatch()
  const isNewCardPackAdded = useAppSelector(isNewCardPackAddedSelector)
  const [text, setText] = useState('')
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }
  const handlerOnClickCancel = () => {
    setIsModalOpen(false)
  }
  const handlerOnClickAddPack = () => {
    dispatch(addPackTC({ cardsPack: { name: text } }))
  }

  useEffect(() => {
    if (isNewCardPackAdded) {
      setIsModalOpen(false)
      setText('')
      dispatch(isNewCardPackAddedAC({ isNewCardPackAdded: false }))
    }
  }, [isNewCardPackAdded])

  return (
    <BasicModals isOpen={isModalAddOpen} handleClose={handleClose}>
      <div className={s.container}>
        <div className={s.headerContainer}>
          <p className={s.title}>Add new pack</p>
          <img onClick={handlerOnClickCancel} className={s.img} src={Close} alt={'close'} />
        </div>
        <TextField
          className={s.input}
          id="standard-basic"
          label="Name pack"
          variant="standard"
          onChange={handlerInput}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          className={s.checkBox}
          label="Private pack"
        />
        <div className={s.buttonContainer}>
          <Button onClick={handlerOnClickCancel} variant="text" className={s.buttonCancel}>
            Cancel
          </Button>
          <Button
            onClick={handlerOnClickAddPack}
            type={'submit'}
            variant={'contained'}
            className={s.buttonSave}
          >
            Save
          </Button>
        </div>
      </div>
    </BasicModals>
  )
}
