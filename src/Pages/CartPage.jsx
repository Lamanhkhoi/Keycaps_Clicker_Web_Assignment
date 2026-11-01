import { Container } from "react-bootstrap";

// Giỏ hàng: dữ liệu lấy từ CartContext.
export default function CartPage() {
  // TODO 1: const { cart, totalPrice } = useCart();
  // TODO 2: giỏ trống → hiện "Giỏ hàng trống" + <Link to="/products">; ngược lại map <CartItemRow />
  // TODO 3: hiện tổng tiền (totalPrice, đã suy ra trong CartContext) + nút "Thanh toán" → /checkout
  //         Hỏi vấn đáp: tổng tiền có cần lưu vào state không? Vì sao?
  return (
    <Container className="py-4">
      <h1>Giỏ hàng</h1>
    </Container>
  );
}
