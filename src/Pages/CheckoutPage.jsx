import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { createOrder } from '../api/gameApi'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/price'

// PHẦN 1: giá trị ban đầu 
const initialValues = {
  customerName: '',
  email: '',
}

// PHẦN 2: Yup
const validationSchema = Yup.object({
  customerName: Yup.string()
    .required('Vui lòng nhập họ tên')
    .min(2, 'Họ tên tối thiểu 2 ký tự'),
  email: Yup.string()
    .required('Vui lòng nhập email')
    .email('Email không hợp lệ'),
})


export default function CheckoutPage() {
  const { cart, totalPrice, dispatch } = useCart()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  // PHẦN 3: khởi tạo Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
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

     
      return createOrder(order)
        .then((savedOrder) => {
          
          navigate('/order-success', { state: { order: savedOrder } })
          
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

  // PHẦN 4: giao diện
  return (
    <Container className="py-4">
      <h1 className="mb-4">Thanh toán</h1>
      <Row className="g-4">
        <Col md={6}>
          <h4>Thông tin của bạn</h4>
          {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">Họ và tên</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                className={formik.touched.customerName && formik.errors.customerName ? 'form-control is-invalid' : 'form-control'}
                value={formik.values.customerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.customerName && formik.errors.customerName && (
                <div className="text-danger small">{formik.errors.customerName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control'}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger small">{formik.errors.email}</div>
              )}
            </div>

            <Button type="submit" variant="success" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Đang gửi...' : 'Đặt hàng'}
            </Button>
          </form>
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
