import { PacksType } from '../features/decks/cardsPack-reducer'

import { instance } from './instanceAxios'

export const cardsApi = {
  getPack() {
    return instance.get<PacksType>('cards/pack')
  },
}
