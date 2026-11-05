import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// path='*' trong App.jsx khớp mọi địa chỉ không có route nào khớp ở trên.
export default function NotFoundPage() {
  return (
    <Container className="py-5 text-center">
      <h1>404 - Không tìm thấy trang</h1>
      <Link to="/">Về trang chủ</Link>
    </Container>
  )
}
