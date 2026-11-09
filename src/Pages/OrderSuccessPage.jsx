import { Alert, Button, Container } from 'react-bootstrap'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { formatPrice } from '../utils/price'


export default function OrderSuccessPage() {
  const location = useLocation()

 
  const order = location.state !== null ? location.state.order : null

  
  if (order === null) {
    return <Navigate to="/" replace />
  }

  return (
    <Container className="py-4">
      <Alert variant="success">
        <h1 className="h3">Đặt hàng thành công!</h1>
        <p className="mb-0">
          Cảm ơn {order.customerName}. Mã đơn của bạn là <strong>#{order.id}</strong>.
        </p>
      </Alert>

      <h4>Chi tiết đơn hàng</h4>
      {order.items.map((item) => (
        <div key={item.gameId} className="d-flex justify-content-between py-1">
          <span>
            {item.name} x {item.qty}
          </span>
          <span>{formatPrice(item.price * item.qty)}</span>
        </div>
      ))}
      <hr />
      <div className="d-flex justify-content-between fs-5 mb-4">
        <strong>Tổng cộng</strong>
        <strong>{formatPrice(order.total)}</strong>
      </div>

      <Button as={Link} to="/products" variant="success">
        Tiếp tục mua sắm
      </Button>
    </Container>
  )
}
