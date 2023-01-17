import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import arrowBack from '../../../assets/images/arrow.svg'
import style from '../Back2Packs/Back2Packs.module.scss'

export const Back2Packs = () => {
  const navigate = useNavigate()
  const go2Packs = () => {
    navigate(PATH.CARDS_PACKS)
  }

  return (
    <div onClick={go2Packs} className={style.back}>
      <img className={style.image} src={arrowBack} alt={'arrow back'} />
      <span className={style.backText}>Back to Packs List</span>
    </div>
  )
}
