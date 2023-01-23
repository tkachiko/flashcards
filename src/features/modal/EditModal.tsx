import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../app/store'
import Close from '../../assets/icons/close.svg'
import Edit from '../../assets/icons/Edit.svg'
import {
  isNewCardPackAddedAC,
  isNewCardPackAddedSelector,
  updatePack,
} from '../packs/cardsPack-reducer'
import style from '../packs/ChangePacks/ChangePacks.module.scss'

import s from './AddandUpdateModal.module.scss'
import { BasicModals } from './basicModals'
type AddModalsType = {
  id: string
  name: string
}
export const EditModal: FC<AddModalsType> = ({ id, name }) => {
  const dispatch = useAppDispatch()
  const isNewCardPackAdded = useAppSelector(isNewCardPackAddedSelector)
  const [text, setText] = useState(name)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }
  const handlerOnClickCancel = () => {
    setOpen(false)
  }
  const handlerOnClickAddPack = () => {
    dispatch(updatePack({ cardsPack: { _id: id, name: text } }))
  }

  useEffect(() => {
    if (isNewCardPackAdded) {
      setOpen(false)
      setText('')
      dispatch(isNewCardPackAddedAC({ isNewCardPackAdded: false }))
    }
  }, [isNewCardPackAdded])

  return (
    <>
      <img className={style.icon} onClick={handleOpen} src={Edit} alt={'Edit'} />
      <BasicModals isOpen={open} handleClose={handleClose}>
        <div className={s.container}>
          <div className={s.headerContainer}>
            <p className={s.title}>Edit pack</p>
            <img onClick={handlerOnClickCancel} className={s.img} src={Close} alt={'close'} />
          </div>
          <TextField
            className={s.input}
            id="standard-basic"
            label="Name pack"
            variant="standard"
            onChange={handlerInput}
            defaultValue={text}
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
    </>
  )
}
