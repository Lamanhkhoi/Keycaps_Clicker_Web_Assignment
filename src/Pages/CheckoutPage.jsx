import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { createOrder } from '../api/gameApi'
import FormField from '../Components/FormField'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/price'

// Trang thanh toán (giả lập, không trả tiền thật).
// Luồng: điền form -> POST /orders lên MockAPI -> sang trang order-success -> xóa giỏ
export default function CheckoutPage() {
  const { cart, totalPrice, dispatch } = useCart()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const formik = useFormik({
    initialValues: {
      customerName: '',
      email: '',
    },
    validationSchema: Yup.object({
      customerName: Yup.string().min(2, 'Tên ít nhất 2 ký tự').required('Vui lòng nhập họ tên'),
      email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    }),
    onSubmit: (values) => {
      // Biến giỏ hàng thành danh sách items để lưu trong đơn
      const items = cart.map((item) => ({
        gameId: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
      }))

      const order = {
        type: 'purchase',
        customerName: values.customerName,
        email: values.email,
        items: items,
        total: totalPrice,
        status: 'completed',
        createdAt: new Date().toISOString(),
      }

      setErrorMessage('')

      // return Promise để Formik biết khi nào gửi xong (isSubmitting tự về false)
      return createOrder(order)
        .then((savedOrder) => {
          // Chuyển trang và gửi kèm đơn vừa lưu qua state của router
          navigate('/order-success', { state: { order: savedOrder } })
          // Đặt hàng xong thì xóa giỏ, để không bị mua trùng
          dispatch({ type: 'CLEAR' })
        })
        // Lỗi thì KHÔNG xóa giỏ, để người dùng thử lại
        .catch(() => setErrorMessage('Không gửi được đơn hàng. Vui lòng thử lại.'))
    },
  })

  if (cart.length === 0) {
    return (
      <Container className="py-4">
        <h1>Thanh toán</h1>
        <p>Giỏ hàng đang trống.</p>
        <Link to="/products">Đi đến cửa hàng</Link>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Thanh toán</h1>
      <Row className="g-4">
        <Col md={6}>
          <h4>Thông tin của bạn</h4>
          {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={formik.handleSubmit}>
            <FormField formik={formik} name="customerName" label="Họ và tên" />
            <FormField formik={formik} name="email" label="Email" type="email" />
            <Button type="submit" variant="success" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Đang gửi...' : 'Đặt hàng'}
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h4>Đơn hàng của bạn</h4>
          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between py-1">
              <span>
                {item.name} x {item.qty}
              </span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fs-5">
            <strong>Tổng cộng</strong>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
