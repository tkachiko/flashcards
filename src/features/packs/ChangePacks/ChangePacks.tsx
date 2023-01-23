import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { userIdSelector } from '../../profile/profile-reducer'
import { deletePack, updatePack } from '../cardsPack-reducer'

import style from './ChangePacks.module.scss'

type ActionSettingType = {
  id: string
  userId: string
  cardscount: number
}
export const ChangePacks = (props: ActionSettingType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector(userIdSelector)

  const handlerDeletePack = () => {
    dispatch(deletePack({ id: props.id }))
  }
  const handlerUpdatePack = () => {
    dispatch(updatePack({ cardsPack: { _id: props.id, name: 'Update' } }))
  }
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
            <IconButton disabled={!props.cardscount} onClick={handlerOpenCards}>
              <SchoolIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Update">
            <IconButton onClick={handlerUpdatePack}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handlerDeletePack}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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
