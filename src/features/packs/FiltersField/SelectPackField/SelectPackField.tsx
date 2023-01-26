import React from 'react'

import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

import { appStatusSelector } from 'app/app-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import { userIdSelector } from 'features/profile/profile-reducer'
import {
  fetchPacks,
  setIdSearchAC,
  isMyPacksAC,
  packNameSearchSelector,
  pageCountSelector,
  setPageAC,
} from 'features/packs/cardsPack-reducer'
import style from '../SelectPackField/SelectPackField.module.scss'

export const SelectPackField = () => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const packNameSearch = useAppSelector(packNameSearchSelector)
  const userId = useAppSelector(userIdSelector)
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  const onClickAllPacksHandler = () => {
    dispatch(isMyPacksAC({ isMyPacks: false }))
    dispatch(setPageAC({ page: 1 }))
    dispatch(setIdSearchAC({ id: '' }))
    setSearchParams({
      page: '1',
      pageCount: pageCount.toString(),
      user_id: '',
      packName: packNameSearch,
    })
    dispatch(fetchPacks({ page: 1, pageCount, user_id: '', packName: packNameSearch }))
  }
  const onClickMyPacksHandler = () => {
    dispatch(isMyPacksAC({ isMyPacks: true }))
    dispatch(setPageAC({ page: 1 }))
    dispatch(setIdSearchAC({ id: userId }))
    setSearchParams({
      page: '1',
      pageCount: pageCount.toString(),
      user_id: userId,
      packName: packNameSearch,
    })
    dispatch(fetchPacks({ page: 1, pageCount, user_id: userId, packName: packNameSearch }))
  }

  const isMy = searchParams.get('user_id')

  const my_btn = style.standardButton + (isMy ? ' ' + style.selectedButton : '')
  const all_btn = style.standardButton + (isMy ? '' : ' ' + style.selectedButton)

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
