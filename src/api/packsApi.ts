import {
  CreatePackResponseType,
  CreatePacksPayloadType,
  DeletePackPayloadType,
  DeletePackResponseType,
  GetPackSPayloadType,
  GetPacksResponseType,
  UpdatePackPayloadType,
  UpdatePackResponseType,
} from '../common/types/types'

import { instance } from './instance'

export const packsApi = {
  getPack(filter: {
    page: number
    pageCount: number
    userId?: string
    min?: number
    max?: number
    packName?: string
  }) {
    return instance.get<PacksType<CardsPackType[]>>('cards/pack', {
      params: {
        page: filter.page,
        pageCount: filter.pageCount,
        user_id: filter.userId,
        min: filter.min,
        max: filter.max,
        packName: filter.packName,
      },
    })
  },
  createPack(payload: CreatePacksPayloadType) {
    return instance.post<CreatePackResponseType>('cards/pack', payload)
  },
  updatePack(payload: UpdatePackPayloadType) {
    return instance.put<UpdatePackResponseType>('cards/pack', payload)
  },
  deletePack(payload: DeletePackPayloadType) {
    return instance.delete<DeletePackResponseType>('cards/pack', { params: payload })
  },
}
