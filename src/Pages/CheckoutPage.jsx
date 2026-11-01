import { Container } from "react-bootstrap";

// Thanh toán giả lập: form (useFormik + Yup) → POST /orders → xoá giỏ → sang /order-success
export default function CheckoutPage() {
  // TODO 1: const { cart, totalPrice, dispatch } = useCart();  (giỏ trống thì nên Navigate về /cart)
  // TODO 2: useFormik: customerName, email (Yup: required, email()) — mẫu xem Components/GameForm.jsx
  // TODO 3: onSubmit (async):
  //           const order = { type: "purchase", customerName, email,
  //                           items: cart.map(i => ({ gameId: i.id, name: i.name, price: i.price, qty: i.qty })),
  //                           total: totalPrice, status: "completed", createdAt: new Date().toISOString() };
  //           const saved = await createOrder(order);     // import từ api/gameApi.js
  //           dispatch({ type: "CLEAR" });                 // vì sao phải xoá giỏ sau khi đặt?
  //           navigate("/order-success", { state: { order: saved } });
  //         Có try/catch: lỗi API thì hiện thông báo, KHÔNG xoá giỏ.
  return (
    <Container className="py-4">
      <h1>Thanh toán</h1>
    </Container>
  );
}
