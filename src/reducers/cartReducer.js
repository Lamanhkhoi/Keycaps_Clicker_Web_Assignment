import { getFinalPrice } from '../utils/price'


export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const game = action.payload
      const existingItem = state.find((item) => item.id === game.id)

      if (existingItem) {
        
        return state.map((item) =>
          item.id === game.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }

      const newItem = {
        id: game.id,
        name: game.name,
        image: game.image,
        price: getFinalPrice(game),
        qty: 1,
      }
      return [...state, newItem]
    }

    case 'REMOVE':
      
      return state.filter((item) => item.id !== action.payload)

    case 'UPDATE_QTY': {
      const { id, qty } = action.payload

      
      if (qty < 1) {
        return state.filter((item) => item.id !== id)
      }

      return state.map((item) => (item.id === id ? { ...item, qty: qty } : item))
    }

    case 'CLEAR':
      return []

    default:
      return state
  }
}
