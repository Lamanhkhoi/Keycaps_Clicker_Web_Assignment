import { Button } from 'react-bootstrap'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/price'

// 1 dòng trong trang giỏ hàng. item = { id, name, image, price, qty }
export default function CartItemRow({ item }) {
  const { dispatch } = useCart()

  const handleIncrease = () => {
    dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty + 1 } })
  }

  // qty giảm xuống 0 thì reducer tự xóa item khỏi giỏ
  const handleDecrease = () => {
    dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty - 1 } })
  }

  const handleRemove = () => {
    dispatch({ type: 'REMOVE', payload: item.id })
  }

  return (
    <div className="cart-row d-flex flex-wrap align-items-center gap-3 py-3">
      <img src={item.image} alt={item.name} width={140} />
      <div className="flex-grow-1">
        <div className="fw-bold">{item.name}</div>
        <div>{formatPrice(item.price)} / game</div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Button variant="outline-secondary" size="sm" onClick={handleDecrease}>
          -
        </Button>
        <span>{item.qty}</span>
        <Button variant="outline-secondary" size="sm" onClick={handleIncrease}>
          +
        </Button>
      </div>
      <strong style={{ minWidth: 80, textAlign: 'right' }}>{formatPrice(item.price * item.qty)}</strong>
      <Button variant="outline-danger" size="sm" onClick={handleRemove}>
        Xóa
      </Button>
    </div>
  )
}
