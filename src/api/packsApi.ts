import { instance } from './instance'

import {
  CreatePackResponseType,
  CreatePacksPayloadType,
  DeletePackPayloadType,
  DeletePackResponseType,
  GetPackSPayloadType,
  GetPacksResponseType,
  UpdatePackPayloadType,
  UpdatePackResponseType,
} from 'common/types/types'

export const packsApi = {
  getPack(filter: GetPackSPayloadType) {
    console.log(filter.page)

    return instance.get<GetPacksResponseType>('cards/pack', {
      params: {
        page: filter.page,
        pageCount: filter.pageCount,
        user_id: filter.user_id,
        min: filter.min,
        max: filter.max,
        packName: filter.packName,
        sortPacks: filter.sortPacks,
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
