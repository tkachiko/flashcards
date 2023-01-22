import React from 'react'

import Button from '@mui/material/Button'

import { appStatusSelector } from '../../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { fetchPacks, isMyPacksAC, isMyPackSelector } from '../../cardsPack-reducer'
import style from '../SelectPackField/SelectPackField.module.scss'

type SelectPackFieldPropsType = {
  pageCount: number
  packName: string
}

export const SelectPackField = (props: SelectPackFieldPropsType) => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const isMyPack = useAppSelector(isMyPackSelector)
  const dispatch = useAppDispatch()
  const onClickAllPacksHandler = () => {
    dispatch(isMyPacksAC({ isMyPacks: false }))
    dispatch(fetchPacks({ pageCount: props.pageCount, packName: props.packName }))
  }
  const onClickMyPacksHandler = () => {
    dispatch(isMyPacksAC({ isMyPacks: true }))
    dispatch(fetchPacks({ pageCount: props.pageCount, packName: props.packName }))
  }

  const my_btn = style.standardButton + (isMyPack ? ' ' + style.selectedButton : '')
  const all_btn = style.standardButton + (isMyPack ? '' : ' ' + style.selectedButton)

  return (
    <div className={style.wrapper}>
      <span className={style.text}>Show packs cards</span>
      <div className={style.buttons}>
        <Button
          disabled={loadingStatus === 'loading'}
          className={my_btn}
          onClick={onClickMyPacksHandler}
        >
          My
        </Button>
        <Button
          disabled={loadingStatus === 'loading'}
          className={all_btn}
          onClick={onClickAllPacksHandler}
        >
          All
        </Button>
      </div>
    </div>
  )
}
