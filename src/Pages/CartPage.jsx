import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CartItemRow from '../Components/CartItemRow'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/price'

// Trang giỏ hàng. Dữ liệu lấy từ CartContext.
export default function CartPage() {
  const { cart, totalPrice, totalItems, dispatch } = useCart()

  const handleClear = () => {
    dispatch({ type: 'CLEAR' })
  }

  // Giỏ trống thì hiện thông báo rồi dừng (return sớm), không vẽ phần bên dưới
  if (cart.length === 0) {
    return (
      <Container className="py-4">
        <h1>Giỏ hàng</h1>
        <p>Giỏ hàng của bạn đang trống.</p>
        <Button as={Link} to="/products" variant="success">
          Đi đến cửa hàng
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Giỏ hàng ({totalItems} game)</h1>

      {cart.map((item) => (
        <CartItemRow key={item.id} item={item} />
      ))}

      <div className="summary-box d-flex justify-content-between align-items-center mt-4">
        <Button variant="outline-danger" onClick={handleClear}>
          Xóa giỏ hàng
        </Button>
        <div className="text-end">
          <div className="fs-4 mb-2">Tổng cộng: {formatPrice(totalPrice)}</div>
          <Button as={Link} to="/checkout" variant="success">
            Thanh toán
          </Button>
        </div>
      </div>
    </Container>
  )
}
