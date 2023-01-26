import React from 'react'

import { useNavigate } from 'react-router-dom'

import style from '../Back2Packs/Back2Packs.module.scss'

import { PATH } from 'app/routes/routes'
import { useAppDispatch } from 'app/store'
import arrowBack from 'assets/images/arrow.svg'
import { setSearchCardName } from 'features/cards/cards-reducer'

export const Back2Packs = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const go2Packs = () => {
    dispatch(setSearchCardName(''))
    navigate(PATH.CARDS_PACKS)
  }

  return (
    <div onClick={go2Packs} className={style.back}>
      <img className={style.image} src={arrowBack} alt={'arrow back'} />
      <span className={style.backText}>Back to Packs List</span>
    </div>
  )
}
