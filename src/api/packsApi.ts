import { CardsPackType, PacksType } from '../common/types/types'

import { instance } from './instance'

export const packsApi = {
  getPack(filter: { page: number; pageCount: number }) {
    return instance.get<PacksType<CardsPackType[]>>('cards/pack', {
      params: {
        page: filter.page,
        pageCount: filter.pageCount,
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
