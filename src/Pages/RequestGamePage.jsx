import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { createOrder } from '../api/gameApi'
import FormField from '../Components/FormField'

// Form 'Yêu cầu thêm game'. Gửi lên MockAPI resource 'orders' với type = 'request'.
export default function RequestGamePage() {
  // message: báo kết quả sau khi gửi. messageType: 'success' hoặc 'danger' (màu Alert)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const formik = useFormik({
    initialValues: {
      customerName: '',
      email: '',
      gameName: '',
      note: '',
    },
    validationSchema: Yup.object({
      customerName: Yup.string().min(2, 'Tên ít nhất 2 ký tự').required('Vui lòng nhập họ tên'),
      email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
      gameName: Yup.string().required('Vui lòng nhập tên game bạn muốn'),
      note: Yup.string().min(10, 'Ghi chú ít nhất 10 ký tự').required('Vui lòng nhập ghi chú'),
    }),
    onSubmit: (values) => {
      const request = {
        type: 'request',
        ...values, // customerName, email, gameName, note
        status: 'pending',
        createdAt: new Date().toISOString(),
      }

      return createOrder(request)
        .then(() => {
          setMessageType('success')
          setMessage('Đã gửi yêu cầu! Chúng tôi sẽ xem xét sớm nhất.')
          // resetForm đưa các ô nhập về giá trị ban đầu (rỗng)
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

          <Form onSubmit={formik.handleSubmit}>
            <FormField formik={formik} name="customerName" label="Họ và tên" />
            <FormField formik={formik} name="email" label="Email" type="email" />
            <FormField formik={formik} name="gameName" label="Tên game bạn muốn" />
            <FormField formik={formik} name="note" label="Ghi chú" as="textarea" />
            <Button type="submit" variant="success" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
