import {
  CardType,
  CreateCardRequestType,
  GetCardsRequestType,
  GetCardsResponseType,
  GradeRequestType,
  UpdateCardRequestType,
} from '../common/types/types'

import { instance } from './instance'

export const cardsApi = {
  getCards(data: GetCardsRequestType) {
    return instance.get<GetCardsResponseType<CardType[]>>(`cards/card`, { params: data })
  },
  createCard(data: CreateCardRequestType) {
    return instance.post(`cards/card`, { card: data })
  },
  updateCard(card: UpdateCardRequestType) {
    return instance.put(`cards/card`, { card })
  },
  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`)
  },
  setGrade(data: GradeRequestType) {
    return instance.put(`cards/grade`, data)
  },
}
