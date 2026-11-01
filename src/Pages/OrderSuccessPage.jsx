import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// Đặt hàng thành công. Thông tin đơn được truyền qua navigate("/order-success", { state: { order } }).
export default function OrderSuccessPage() {
  // TODO 1: const { state } = useLocation();  const order = state?.order;
  // TODO 2: vào thẳng /order-success (không có order) thì sao?
  //         → return <Navigate to="/" replace />;   Hỏi vấn đáp: "?." làm gì? replace để làm gì?
  // TODO 3: hiện mã đơn (order.id), tên khách, danh sách game, tổng tiền
  return (
    <Container className="py-4">
      <h1>Đặt hàng thành công</h1>
      <Link to="/products">Tiếp tục mua sắm</Link>
    </Container>
  );
}
