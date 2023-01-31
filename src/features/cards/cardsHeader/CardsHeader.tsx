import React, { FC, useState } from 'react'

import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import { imageSelector } from '../../packs/cardsPack-reducer'
import { packNameSelector, setPackId } from '../cards-reducer'

import style from './CardsHeader.module.scss'

import { appStatusSelector } from 'app/app-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import { AddModalCard } from 'features/modal/AddModalCard'

type CardsHeaderPropsType = {
  packId: string | null
}

export const CardsHeader: FC<CardsHeaderPropsType> = ({ packId }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loadingStatus = useAppSelector(appStatusSelector)
  const packName = useAppSelector(packNameSelector)
  const image = useAppSelector(imageSelector)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handlerOpenCards = (packId: string | null) => {
    if (packId) {
      dispatch(setPackId(packId))
      navigate(PATH.LEARNING_CARDS + `/${packId}`)
    }
  }

  return (
    <div className={style.header}>
      <div className={style.cover}>
        <h2 className={style.h2}>{packName}</h2>
        {image && <img src={image?.deckCover} />}
      </div>
      <div className={style.modal}>
        <AddModalCard
          isModalAddOpen={open}
          setIsModalOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>

      <Button
        variant={'contained'}
        type={'button'}
        fullWidth
        disableRipple
        disabled={loadingStatus === 'loading'}
        className={`${style.button} ${style.learnButton}`}
        onClick={() => handlerOpenCards(packId)}
      >
        Learn Pack
      </Button>
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
