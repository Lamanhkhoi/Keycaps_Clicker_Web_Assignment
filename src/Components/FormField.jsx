import { Form } from 'react-bootstrap'

// Một ô nhập dùng chung cho các form Formik (tránh viết lặp lại).
// Props:
//   formik = kết quả của useFormik(...)
//   name   = tên field (phải trùng tên trong initialValues)
//   label  = chữ hiển thị phía trên ô nhập
//   type   = loại input (mặc định 'text')
//   as     = 'textarea' cho ô nhập nhiều dòng
export default function FormField({ formik, name, label, type = 'text', as }) {
  // Chỉ báo lỗi khi người dùng đã chạm vào ô (touched) VÀ ô đó có lỗi
  const showError = formik.touched[name] && formik.errors[name]

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        as={as}
        rows={3}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={Boolean(showError)}
      />
      <Form.Control.Feedback type="invalid">{formik.errors[name]}</Form.Control.Feedback>
    </Form.Group>
  )
}
