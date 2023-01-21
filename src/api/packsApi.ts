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
  getPack(payload: GetPackSPayloadType) {
    return instance.get<GetPacksResponseType>('cards/pack', { params: payload })
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
