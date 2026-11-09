import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Bọc quanh trang chỉ dành cho admin. Không phải admin thì chuyển sang trang đăng nhập.
// replace: thay trang hiện tại trong lịch sử, để nút Back không quay lại trang bị chặn.
export default function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return <Navigate to="/login" replace />
  }

  return children
}
