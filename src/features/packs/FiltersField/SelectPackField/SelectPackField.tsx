import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { fetchPacks, isMyPacksAC, isMyPackSelector } from '../../cardsPack-reducer'
import style from '../SelectPackField/SelectPackField.module.scss'

export const SelectPackField = () => {
  const isMyPack = useAppSelector(isMyPackSelector)
  const dispatch = useAppDispatch()
  const onClickAllPacksHandler = () => {
    dispatch(isMyPacksAC({ isMyPacks: false }))
    dispatch(fetchPacks({ filter: { page: 1, pageCount: 10, isMyPacks: false } }))
  }
  const onClickMyPacksHandler = () => {
    dispatch(isMyPacksAC({ isMyPacks: true }))
    dispatch(fetchPacks({ filter: { page: 1, pageCount: 10, isMyPacks: true } }))
  }

  const my_btn = style.standardButton + (isMyPack ? ' ' + style.selectedButton : '')
  const all_btn = style.standardButton + (isMyPack ? '' : ' ' + style.selectedButton)

  return (
    <div className={style.wrapper}>
      <span className={style.text}>Show packs cards</span>
      <div className={style.buttons}>
        <button className={my_btn} onClick={onClickMyPacksHandler}>
          My
        </button>
        <button className={all_btn} onClick={onClickAllPacksHandler}>
          All
        </button>
      </div>
    </div>
  )
}
