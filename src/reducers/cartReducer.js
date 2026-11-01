// Reducer = hàm thuần: (state cũ, action) → state MỚI. Không được sửa state cũ trực tiếp.
//
// Hình dạng 1 phần tử trong giỏ (cart item):
//   { id: "5", name: "Stardew Valley", image: "...", price: 14.99, qty: 1 }
//   (price là GIÁ SAU GIẢM tại thời điểm thêm vào giỏ)
//
// Ví dụ chạy:
//   state = []
//   { type: "ADD", payload: game5 }            → [{ id:"5", ..., qty:1 }]
//   { type: "ADD", payload: game5 } (lần 2)    → [{ id:"5", ..., qty:2 }]   (đã có thì tăng qty)
//   { type: "UPDATE_QTY", payload: {id:"5", qty:3} } → qty = 3
//   { type: "REMOVE", payload: "5" }           → []
//   { type: "CLEAR" }                          → []

export const initialCart = [];

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // TODO: nếu game đã có trong giỏ → map, tăng qty lên 1 (tạo object mới!)
      //       nếu chưa có → [...state, { ...item mới, qty: 1 }]
      return state;

    case "REMOVE":
      // TODO: filter bỏ item có id === action.payload
      return state;

    case "UPDATE_QTY":
      // TODO: map, đổi qty của item có id === action.payload.id
      //       (gợi ý: qty < 1 thì sao? xoá luôn hay giữ 1 — tự chọn và giải thích được)
      return state;

    case "CLEAR":
      return [];

    default:
      return state;
  }
}
