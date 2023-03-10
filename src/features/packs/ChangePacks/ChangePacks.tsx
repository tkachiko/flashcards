import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useNavigate } from 'react-router-dom'

import { setPackId } from '../../cards/cards-reducer'

import style from './ChangePacks.module.scss'

import { appStatusSelector } from 'app/app-reducer'
import { PATH } from 'app/routes/routes'
import { useAppDispatch, useAppSelector } from 'app/store'
import { DeleteModalPack } from 'features/modal/DeleteModalPack'
import { EditModalPack } from 'features/modal/EditModalPack'
import { userIdSelector } from 'features/profile/profile-reducer'

type ActionSettingType = {
  id: string
  userId: string
  name: string
  cardscount: number
}
export const ChangePacks = (props: ActionSettingType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector(userIdSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const handlerOpenCards = (packId: string) => {
    dispatch(setPackId(packId))
    navigate(PATH.LEARNING_CARDS + `/${packId}`)
  }

  return (
    <div className={style.container}>
      {userId === props.userId ? (
        <>
          <Tooltip title="Learn">
            <span>
              <IconButton
                disabled={loadingStatus === 'loading' || !props.cardscount}
                onClick={() => handlerOpenCards(props.id)}
              >
                <SchoolIcon />
              </IconButton>
            </span>
          </Tooltip>
          <div>
            <EditModalPack id={props.id} name={props.name} />
          </div>
          <DeleteModalPack id={props.id} name={props.name} />
        </>
      ) : (
        <Tooltip title="Learn">
          <span>
            <IconButton disabled={!props.cardscount} onClick={() => handlerOpenCards(props.id)}>
              <SchoolIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </div>
  )
}
