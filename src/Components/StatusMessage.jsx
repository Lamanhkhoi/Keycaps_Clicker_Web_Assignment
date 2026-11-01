import { Alert, Spinner } from "react-bootstrap";

// Hiện trạng thái khi gọi API: đang tải / lỗi. Không có gì thì không render gì (null).
// Dùng: <StatusMessage loading={loading} error={error} />
export default function StatusMessage({ loading, error }) {
  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return null;
}
