// Hàm thuần (pure function) xử lý giá. Dữ liệu từ MockAPI:
//   game = { price: 59.99, discount: 75, ... }   (discount tính theo %)

// Giá sau giảm. Ví dụ: price 24.99, discount 75 → 6.25 (làm tròn 2 chữ số)
export function getFinalPrice(game) {
  // TODO: price * (1 - discount / 100), làm tròn 2 chữ số
  return game.price;
}

// Định dạng hiển thị. Ví dụ: 0 → "Free", 6.25 → "$6.25"
export function formatPrice(value) {
  // TODO: value === 0 thì trả "Free", ngược lại "$" + value.toFixed(2)
  return String(value);
}
