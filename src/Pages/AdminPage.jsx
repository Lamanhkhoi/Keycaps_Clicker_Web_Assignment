import { Container } from "react-bootstrap";

// Admin đơn giản: CRUD game qua MockAPI + xem đơn hàng / yêu cầu.
export default function AdminPage() {
  // TODO 1 (Read):   games = getGames() trong useEffect → bảng (Table) tên, genre, giá, nút Sửa / Xoá
  // TODO 2 (Create): nút "Thêm game" → hiện <GameForm onSubmit={...} /> → createGame(values) → cập nhật lại danh sách
  // TODO 3 (Update): bấm Sửa → <GameForm initialValues={game} /> → updateGame(game.id, values)
  // TODO 4 (Delete): deleteGame(id) rồi filter bỏ khỏi state games (hỏi xác nhận window.confirm trước)
  //         Hỏi vấn đáp: sau khi xoá, cập nhật UI bằng cách gọi lại API hay sửa state? Ưu/nhược?
  // TODO 5: bảng đơn: getOrders() → tách theo type "purchase" và "request"
  return (
    <Container className="py-4">
      <h1>Admin</h1>
    </Container>
  );
}
