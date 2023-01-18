import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { userIdSelector } from '../../../profile/profile-reducer'
import { fetchPacks } from '../../cardsPack-reducer'
import style from '../SelectPackField/SelectPackField.module.scss'

export const SelectPackField = () => {
  const userId = useAppSelector(userIdSelector)

  const dispatch = useAppDispatch()
  const onClickAllPacksHandler = () => {
    dispatch(fetchPacks({ filter: { page: 1, pageCount: 10, userId: '' } }))
  }
  const onClickMyPacksHandler = () => {
    dispatch(fetchPacks({ filter: { page: 1, pageCount: 10, userId } }))
  }

  return (
    <div className={style.wrapper}>
      <span className={style.text}>Show packs cards</span>
      <div className={style.buttons}>
        <button className={style.one_Button} onClick={onClickMyPacksHandler}>
          My
        </button>
        <button className={style.one_Button} onClick={onClickAllPacksHandler}>
          All
        </button>
      </div>
    </div>
  )
}
