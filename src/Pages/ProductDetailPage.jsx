import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

// Chi tiết game: /products/:id
export default function ProductDetailPage() {
  // useParams luôn trả về STRING (vd "5"), kể cả khi URL là /products/5
  const { id } = useParams();

  // TODO 1: game / loading / error + useEffect([id]) gọi getGameById(id)
  //         Hỏi vấn đáp: vì sao dependency là [id]? Điều gì xảy ra nếu bấm sang game khác?
  // TODO 2: id không tồn tại → MockAPI trả 404 → api ném lỗi → hiện thông báo + nút quay lại
  //         (useNavigate: navigate(-1) khác navigate("/products") thế nào?)
  // TODO 3: hiển thị ảnh, mô tả, developer, ngày phát hành, tags, <PriceTag />, nút "Add to cart"
  return (
    <Container className="py-4">
      <h1>Chi tiết game (id: {id})</h1>
    </Container>
  );
}
