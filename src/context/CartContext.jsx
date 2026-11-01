import { createContext, useContext } from "react";
// import { useReducer } from "react";
// import { cartReducer, initialCart } from "../reducers/cartReducer";

// Context giải quyết prop drilling: Navbar (badge), CartPage, GameCard (nút Add)
// đều cần giỏ hàng mà không phải truyền props qua nhiều tầng.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // TODO 1: const [cart, dispatch] = useReducer(cartReducer, initialCart);
  // TODO 2 (bước 7): lưu giỏ vào localStorage để F5 không mất
  //         (dùng hooks/useLocalStorage hoặc useEffect — tự chọn, giải thích được)
  // TODO 3: totalItems, totalPrice là DỮ LIỆU SUY RA từ cart (tính khi render),
  //         KHÔNG tạo state riêng. Dùng reduce().

  const value = {
    cart: [], // TODO: thay bằng cart thật
    dispatch: () => {}, // TODO: thay bằng dispatch thật
    totalItems: 0,
    totalPrice: 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook tiện dụng để component gọi: const { cart, dispatch } = useCart();
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}
