// Hai hàm xử lý giá. Game từ MockAPI có dạng: { price: 9.99, discount: 75, ... }
// discount tính theo phần trăm (%).

// Giá sau khi giảm.
// Ví dụ: price = 9.99, discount = 75
//   số tiền được giảm = 9.99 * 75 / 100 = 7.4925
//   giá sau giảm      = 9.99 - 7.4925   = 2.4975
//   làm tròn 2 số lẻ  = 2.5
export const getFinalPrice = (game) => {
  const discountAmount = (game.price * game.discount) / 100
  const finalPrice = game.price - discountAmount
  // Math.round chỉ làm tròn thành số nguyên, nên nhân 100 rồi chia 100 để giữ 2 số lẻ
  return Math.round(finalPrice * 100) / 100
}

// Hiển thị giá cho người dùng. Ví dụ: 0 -> 'Free', 2.5 -> '$2.50'
export const formatPrice = (value) => {
  if (value === 0) {
    return 'Free'
  }
  return `$${value.toFixed(2)}`
}
