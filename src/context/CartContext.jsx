import { createContext, useContext, useEffect, useReducer } from 'react'
import { cartReducer } from '../reducers/cartReducer'


// Navbar (hiện số lượng), CartPage, GameCard (nút Thêm) đều dùng chung giỏ hàng này.
const CartContext = createContext(null)

// Đọc giỏ đã lưu trong localStorage (nếu có), để F5 trang không bị mất giỏ.
const loadCart = () => {
  const saved = localStorage.getItem('cart')
  if (saved === null) {
    return []
  }
  return JSON.parse(saved)
}

export function CartProvider({ children }) {
  
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart)

  // Mỗi khi cart đổi thì lưu lại vào localStorage. [cart]: effect chỉ chạy khi cart đổi.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // totalItems và totalPrice SUY RA từ cart -> tính khi render, không tạo state riêng.
  let totalItems = 0
  let totalPrice = 0
  cart.forEach((item) => {
    totalItems = totalItems + item.qty
    totalPrice = totalPrice + item.price * item.qty
  })
  totalPrice = Math.round(totalPrice * 100) / 100

  const value = { cart, dispatch, totalItems, totalPrice }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Lối tắt: trong component chỉ cần viết const { cart, dispatch } = useCart()
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)
