import { CardsPackType, PacksType } from '../common/types/types'

import { instance } from './instance'

export const packsApi = {
  getPack(filter: {
    page: number
    pageCount: number
    userId?: string
    min?: number
    max?: number
  }) {
    return instance.get<PacksType<CardsPackType[]>>('cards/pack', {
      params: {
        page: filter.page,
        pageCount: filter.pageCount,
        user_id: filter.userId,
        min: filter.min,
        max: filter.max,
      },
    })
  },
  createPack(name: string) {
    return instance.post(`cards/pack`, { cardsPack: { name } })
  },
  updatePack(_id: string) {
    return instance.put(`cards/pack`, { cardsPack: { _id } })
  },
  deletePack(id: string) {
    return instance.delete(`cards/pack?id=${id}`)
  },
}
