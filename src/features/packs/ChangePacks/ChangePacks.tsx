import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import {useAppSelector } from '../../../app/store'
import { appStatusSelector } from '../../../app/app-reducer'
import { DeleteModal } from '../../modal/DeleteModal'
import { EditModal } from '../../modal/EditModal'
import { userIdSelector } from '../../profile/profile-reducer'

import style from './ChangePacks.module.scss'

type ActionSettingType = {
  id: string
  userId: string
  name: string
  cardscount: number
}
export const ChangePacks = (props: ActionSettingType) => {
  const navigate = useNavigate()
  const userId = useAppSelector(userIdSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const handlerOpenCards = () => {
    if (props.id) {
      navigate(PATH.CARDS)
    }
  }

  return (
    <div className={style.container}>
      {userId === props.userId ? (
        <>
          <Tooltip title="Learn">
            <IconButton
                disabled={loadingStatus === 'loading' || !props.cardscount}
                onClick={handlerOpenCards}
            >
              <SchoolIcon />
            </IconButton>
          </Tooltip>
          <div>
            <EditModal id={props.id} name={props.name} />
          </div>
          <DeleteModal id={props.id} name={props.name} />
        </>
      ) : (
        <Tooltip title="Learn">
          <IconButton disabled={!props.cardscount} onClick={handlerOpenCards}>
            <SchoolIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  )
}
