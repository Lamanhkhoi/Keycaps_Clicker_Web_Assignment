import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { createOrder } from '../api/gameApi'


const initialValues = {
  customerName: '',
  email: '',
  gameName: '',
  note: '',
}

const validationSchema = Yup.object({
  customerName: Yup.string()
    .required('Vui lòng nhập họ tên')
    .min(2, 'Họ tên tối thiểu 2 ký tự'),
  email: Yup.string()
    .required('Vui lòng nhập email')
    .email('Email không hợp lệ'),
  gameName: Yup.string()
    .required('Vui lòng nhập tên game bạn muốn'),
  note: Yup.string()
    .required('Vui lòng nhập ghi chú')
    .min(10, 'Ghi chú tối thiểu 10 ký tự'),
})


export default function RequestGamePage() {
  
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const request = {
        type: 'request',
        customerName: values.customerName,
        email: values.email,
        gameName: values.gameName,
        note: values.note,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }

      
      return createOrder(request)
        .then(() => {
          setMessageType('success')
          setMessage('Đã gửi yêu cầu! Chúng tôi sẽ xem xét sớm nhất.')
          formik.resetForm()
        })
        .catch(() => {
          setMessageType('danger')
          setMessage('Không gửi được yêu cầu. Vui lòng thử lại.')
        })
    },
  })

  return (
    <Container className="py-4">
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <h1 className="mb-3">Yêu cầu thêm game</h1>
          <p>Chưa thấy game bạn muốn? Hãy cho chúng tôi biết.</p>

          {message !== '' && <Alert variant={messageType}>{message}</Alert>}

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

            <div className="mb-3">
              <label htmlFor="gameName" className="form-label">Tên game bạn muốn</label>
              <input
                type="text"
                id="gameName"
                name="gameName"
                className={formik.touched.gameName && formik.errors.gameName ? 'form-control is-invalid' : 'form-control'}
                value={formik.values.gameName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.gameName && formik.errors.gameName && (
                <div className="text-danger small">{formik.errors.gameName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="note" className="form-label">Ghi chú</label>
              <textarea
                id="note"
                name="note"
                rows={3}
                className={formik.touched.note && formik.errors.note ? 'form-control is-invalid' : 'form-control'}
                value={formik.values.note}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.note && formik.errors.note && (
                <div className="text-danger small">{formik.errors.note}</div>
              )}
            </div>

            <Button type="submit" variant="success" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  )
}
