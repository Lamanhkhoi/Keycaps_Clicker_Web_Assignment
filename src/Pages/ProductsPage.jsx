import { Container } from "react-bootstrap";

// Cửa hàng: danh sách game + tìm kiếm + lọc thể loại + sắp xếp.
export default function ProductsPage() {
  // TODO 1: games / loading / error (useState) + useEffect gọi getGames()
  // TODO 2: filters = useReducer(filterReducer, initialFilters)   → thể loại + kiểu sắp xếp
  //         search  = useState("")                                → ô tìm kiếm
  //         Hỏi vấn đáp: vì sao filter dùng useReducer còn search dùng useState?
  // TODO 3: visibleGames = games.filter(theo genre).filter(theo search).sort(theo sortBy)
  //         → tính ngay khi render, KHÔNG lưu vào state. Lưu ý .sort() sửa mảng gốc → copy trước ([...arr])
  //         Gợi ý sortBy: "popular" = recommendations giảm dần; "price-*" dùng getFinalPrice (utils/price.js)
  // TODO 4: render <FilterBar ... /> (props xem Components/FilterBar.jsx),
  //         <StatusMessage />, và lưới <Row><Col>… <GameCard key={game.id} game={game} /></Col></Row>
  //         Danh sách rỗng thì hiện "Không tìm thấy game" (conditional rendering)
  return (
    <Container className="py-4">
      <h1>Cửa hàng</h1>
    </Container>
  );
}
