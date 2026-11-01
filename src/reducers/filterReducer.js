// State của thanh lọc ở trang Cửa hàng (nhiều trường → dùng useReducer).
// Ô tìm kiếm (1 chuỗi) thì dùng useState riêng trong ProductsPage.
//
// Ví dụ: { genre: "All", sortBy: "popular" }
//   { type: "SET_GENRE", payload: "RPG" }  → { genre: "RPG", sortBy: "popular" }
//   { type: "SET_SORT",  payload: "price-asc" } → đổi sortBy
//   { type: "RESET" } → về initialFilters

export const initialFilters = {
  genre: "All", // "All" | "Action" | "Adventure" | "RPG" | "Strategy" | "Simulation" | "Casual"
  sortBy: "popular", // "popular" | "price-asc" | "price-desc" | "name"
};

export function filterReducer(state, action) {
  switch (action.type) {
    case "SET_GENRE":
      // TODO: trả object mới, chỉ đổi genre
      return state;
    case "SET_SORT":
      // TODO: trả object mới, chỉ đổi sortBy
      return state;
    case "RESET":
      return initialFilters;
    default:
      return state;
  }
}
