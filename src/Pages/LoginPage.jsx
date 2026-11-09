import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Alert, Button, Container } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// PHẦN 1: giá trị ban đầu
const initialValues = {
  username: '',
  password: '',
}

// PHẦN 2: Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
})

export default function LoginPage() {
  const { isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  // PHẦN 3: khởi tạo Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const ok = login(values.username, values.password)
      if (ok) {
        navigate('/admin')
      } else {
        setErrorMessage('Sai tên đăng nhập hoặc mật khẩu')
      }
    },
  })

  // Đã đăng nhập rồi thì không cần hiện form nữa
  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  // PHẦN 4: giao diện
  return (
    <Container className="py-4" style={{ maxWidth: 420 }}>
      <h1 className="mb-4">Đăng nhập Admin</h1>
      {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}

      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            name="username"
            className={formik.touched.username && formik.errors.username ? 'form-control is-invalid' : 'form-control'}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-danger small">{formik.errors.username}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger small">{formik.errors.password}</div>
          )}
        </div>

        <Button type="submit" variant="success">
          Đăng nhập
        </Button>
      </form>
    </Container>
  )
}
