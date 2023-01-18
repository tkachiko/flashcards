import { UpdateCardRequestType } from '../common/types/types'
import { CardsPackType, PacksType } from '../features/decks/cardsPack-reducer'

import { instance } from './instance'

export const cardsApi = {
  getPack() {
    return instance.get<PacksType<CardsPackType[]>>('cards/pack')
  },
  createPack(name: string) {
    return instance.post(`cards/pack`, { name })
  },
  updatePack(data: UpdateCardRequestType) {
    return instance.put(`cards/pack`, { data })
  },
  deletePack(id: string) {
    return instance.delete(`cards/pack?id=${id}`)
  },
}

export type GetPacksRequestType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number

  user_id?: string

  block?: boolean
}
