import {
  CardType,
  CreateCardRequestType,
  GetCardsRequestType,
  GetCardsResponseType,
  UpdateCardRequestType,
} from '../common/types/types'

import { instance } from './instance'

export const cardsApi = {
  getCards(data: GetCardsRequestType) {
    debugger

    return instance.get<GetCardsResponseType<CardType[]>>(`cards/card`, { params: data })
  },
  createCard(data: CreateCardRequestType) {
    return instance.post(`cards/card`, { card: data })
  },
  updateCard(data: UpdateCardRequestType) {
    return instance.put(`cards/card`, { data })
  },
  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`)
  },
}
