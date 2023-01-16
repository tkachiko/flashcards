import { PacksType } from '../features/decks/cardsPack-reducer'

import { instance } from './instance'

export const cardsApi = {
  getPack() {
    return instance.get<PacksType>('cards/pack')
  },
}
