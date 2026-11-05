// State của thanh lọc ở trang Cửa hàng (có nhiều trường nên dùng useReducer).
// Ô tìm kiếm chỉ là 1 chuỗi nên dùng useState riêng trong ProductsPage.
//
// Ví dụ: state = { genre: 'All', sortBy: 'popular' }
//   { type: 'SET_GENRE', payload: 'RPG' }      -> { genre: 'RPG', sortBy: 'popular' }
//   { type: 'SET_SORT', payload: 'price-asc' } -> { genre: 'RPG', sortBy: 'price-asc' }

export const initialFilters = {
  genre: 'All', // 'All' hoặc Action, Adventure, RPG, Strategy, Simulation, Casual
  sortBy: 'popular', // 'popular', 'price-asc', 'price-desc' hoặc 'name'
}

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GENRE':
      // ...state sao chép object cũ, rồi ghi đè genre bằng giá trị mới
      return { ...state, genre: action.payload }
    case 'SET_SORT':
      return { ...state, sortBy: action.payload }
    default:
      return state
  }
}
