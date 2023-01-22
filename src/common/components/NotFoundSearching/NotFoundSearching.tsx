import React from 'react'

import style from '../NotFoundSearching/NotFoundSearching.module.scss'

type NotFoundSearchingPropsType = {
  packName: string
}

export const NotFoundSearching = (props: NotFoundSearchingPropsType) => {
  return (
    <div className={style.wrapper}>
      <h4>Not found for {props.packName}</h4>
    </div>
  )
}
