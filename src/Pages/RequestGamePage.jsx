import { Container } from "react-bootstrap";

// Form "Yêu cầu thêm game" (thay cho form đặt custom): gửi lên MockAPI resource "orders" với type "request".
export default function RequestGamePage() {
  // TODO 1: useFormik: customerName, email, gameName, note
  //         Yup: gameName required, note required + min 10 ký tự, email hợp lệ…
  // TODO 2: onSubmit (async) → createOrder({ type: "request", customerName, email, gameName, note,
  //                                           status: "pending", createdAt: new Date().toISOString() })
  //         Thành công → hiện thông báo + resetForm(); thất bại → hiện lỗi
  // TODO 3: hiển thị lỗi chỉ khi field đã touched (formik.touched.xxx && formik.errors.xxx)
  //         Hỏi vấn đáp: validation chạy khi nào? touched dùng để làm gì?
  return (
    <Container className="py-4">
      <h1>Yêu cầu thêm game</h1>
    </Container>
  );
}
