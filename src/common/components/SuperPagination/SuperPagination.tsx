import React, { ChangeEvent, useEffect, useState } from 'react'

import Pagination from '@mui/material/Pagination'
//
// import Pagination from '@mui/material/Pagination'
// import { AxiosError } from 'axios'
//
// import { packs } from '../../../api/packs'
// import { loginAPI } from '../../../api/login-api'
// import { setSubmittingAC } from '../../../app/app-reducer'
// import { RootStateType, useAppDispatch, useAppSelector } from '../../../app/store'
// import { setIsLoggedInAC } from '../../../features/auth/login/auth-reducer'
// import { setCardPacksAC } from '../../../features/cardpacks/cardpacks-reducer'
// import { nameSelector, setDataAC } from '../../../features/profile/profile-reducer'
// import { errorMessage } from '../../../utils/error-utils'
// import { LoginType, ThunkAppDispatchType } from '../../types/types'

export const SuperPagination = () => {
  // const totalcount = useAppSelector(cardPacksTotalCountSelector)
  // const pagecount = useAppSelector(pageCountSelector)
  // const cardpacs = useAppSelector(cardPacksSelector)
  // let pageserver = useAppSelector(pageSelector)
  // const dispatch = useAppDispatch()
  // let [page, setPage] = useState(2)
  // const [count, setCount] = useState(pagecount)
  // const onChangePagination = (event: ChangeEvent<unknown>, newPage: number) => {
  //   console.log(page)
  //   setPage(newPage)
  // }
  // const getCardPacksTC =
  //   (page?: number): ThunkAppDispatchType =>
  //   async dispatch => {
  //     dispatch(setSubmittingAC('loading'))
  //     try {
  //       const res = await packs.getCardsPack(page)
  //
  //       console.log(res.data)
  //       dispatch(setCardPacksAC(res.data))
  //
  //       dispatch(setSubmittingAC('success'))
  //     } catch (e) {
  //       const error = e as Error | AxiosError
  //
  //       errorMessage(dispatch, error)
  //     }
  //   }
  // const colods = cardpacs.map(c => (
  //   <div key={c._id}>
  //     <div id={'hw15-tech-' + c._id}>{c.name}</div>
  //   </div>
  // ))
  //
  // useEffect(() => {
  //   dispatch(getCardPacksTC(page))
  //   setPage(page)
  // }, [page])

  return (
    <div>
      <Pagination count={10} page={1} variant="outlined" shape="rounded" />
    </div>
  )
}

// export const cardPacksSelector = (state: RootStateType) => state.cardpacks.data.cardPacks
// export const cardPacksTotalCountSelector = (state: RootStateType) =>
//   state.cardpacks.data.cardPacksTotalCount
// export const pageCountSelector = (state: RootStateType) => state.cardpacks.data.pageCount
// export const pageSelector = (state: RootStateType) => state.cardpacks.data.page
