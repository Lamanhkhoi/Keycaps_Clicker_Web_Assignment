import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// path="*" khớp mọi URL không có route nào khớp ở trên.
export default function NotFoundPage() {
  return (
    <Container className="py-5 text-center">
      <h1>404 - Not Found</h1>
      <Link to="/">Về trang chủ</Link>
    </Container>
  );
}
