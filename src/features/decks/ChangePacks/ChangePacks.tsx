import React from 'react'

import {useAppDispatch, useAppSelector} from '../../../app/store'
import Delete from '../../../assets/icons/Delete.svg'
import Edit from '../../../assets/icons/Edit.svg'
import Teacher from '../../../assets/icons/teacher.svg'
import {deletePack, packSelector, updatePack} from '../cardsPack-reducer'

import s from './ChangePacks.module.scss'
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../app/routes/routes";

type ActionSettingType = {
    id: string
}
export const ChangePacks = (props: ActionSettingType) => {
    const navigate = useNavigate()
    const pack = useAppSelector(packSelector)
    const dispatch = useAppDispatch()
    const handlerDeletePack = () => {
        dispatch(deletePack(props.id))
    }
    const handlerUpdatePack = () => {
        dispatch(updatePack(props.id))
    }
    const handlerOpenCards = () => {
        if (props.id) {
            navigate(PATH.CARDS)
        }
    }

    return (
        <div className={s.container}>
            <img className={s.icon} onClick={handlerOpenCards} src={Teacher}/>
            <img className={s.icon} onClick={handlerUpdatePack} src={Edit}/>
            <img className={s.icon} onClick={handlerDeletePack} src={Delete}/>
        </div>
    )
}
