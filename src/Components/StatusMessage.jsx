import { Alert, Spinner } from 'react-bootstrap'

// Hiện trạng thái khi gọi API: đang tải hoặc bị lỗi.
// Không có gì để hiện thì trả về null (không vẽ gì).
// Cách dùng: <StatusMessage loading={loading} error={error} />
// Trang nào đã có GameSkeleton thì không truyền loading (mặc định false), chỉ truyền error.
export default function StatusMessage({ loading = false, error = '' }) {
  if (loading) {
    return <Spinner animation="border" role="status" />
  }
  if (error !== '') {
    return <Alert variant="danger">{error}</Alert>
  }
  return null
}
