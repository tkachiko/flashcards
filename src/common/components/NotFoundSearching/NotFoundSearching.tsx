import React from 'react'

import style from '../NotFoundSearching/NotFoundSearching.module.scss'

type NotFoundSearchingPropsType = {
  packName: string
}

export const NotFoundSearching = (props: NotFoundSearchingPropsType) => {
  const error = props.packName.length ? props.packName : 'this query'

  return (
    <div className={style.wrapper}>
      <h4>Not found for {error}</h4>
    </div>
  )
}
