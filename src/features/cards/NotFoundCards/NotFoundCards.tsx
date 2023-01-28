import React, { FC } from 'react'

import { NotFoundSearching } from '../../../common/components/NotFoundSearching/NotFoundSearching'
import { SearchField } from '../../packs/FiltersField/SearchField/SearchField'
import { EmptyPack } from '../emptyPack/EmptyPack'
import style from '../NotFoundCards/NotFoundCards.module.scss'

type NotFoundCardsPropsType = {
  debouncedSearch: string
  handleChangeSearch: (search: string) => void
}

export const NotFoundCards: FC<NotFoundCardsPropsType> = ({
  debouncedSearch,
  handleChangeSearch,
}) => {
  return debouncedSearch.length ? (
    <div className={style.wrapper}>
      <SearchField search={debouncedSearch} handleChangeSearch={handleChangeSearch} />
      <NotFoundSearching packName={debouncedSearch} />
    </div>
  ) : (
    <EmptyPack />
  )
}
