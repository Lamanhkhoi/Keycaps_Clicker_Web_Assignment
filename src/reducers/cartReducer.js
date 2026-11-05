import { getFinalPrice } from '../utils/price'

// Reducer là một hàm: nhận (state cũ, action) và trả về state MỚI.
// KHÔNG được sửa trực tiếp state cũ (không push, không gán item.qty = ...).
// Phải tạo mảng/object mới để React thấy state đổi và vẽ lại.
//
// Mỗi item trong giỏ: { id: '5', name: 'Stardew Valley', image: '...', price: 14.99, qty: 1 }
// price ở đây là GIÁ SAU GIẢM.
//
// Ví dụ chạy:
//   state = []
//   ADD game 5             -> [ { id: '5', ..., qty: 1 } ]
//   ADD game 5 (lần 2)     -> [ { id: '5', ..., qty: 2 } ]
//   UPDATE_QTY id 5, qty 3 -> qty = 3
//   REMOVE '5'             -> []
//   CLEAR                  -> []

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const game = action.payload
      const existingItem = state.find((item) => item.id === game.id)

      if (existingItem) {
        // Game đã có trong giỏ: tạo mảng mới, tăng qty của đúng game đó lên 1
        return state.map((item) =>
          item.id === game.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }

      // Game chưa có trong giỏ: thêm một item mới vào cuối mảng
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
      // Giữ lại tất cả item có id KHÁC id cần xóa
      return state.filter((item) => item.id !== action.payload)

    case 'UPDATE_QTY': {
      const { id, qty } = action.payload

      // Giảm xuống dưới 1 thì xóa luôn khỏi giỏ
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
