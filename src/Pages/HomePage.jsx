import { Container } from "react-bootstrap";

// Trang chủ: banner + game nổi bật (featured = true) + đang giảm giá.
export default function HomePage() {
  // TODO 1: state games / loading / error (useState) + useEffect([]) gọi getGames() một lần khi mount
  //         Hỏi vấn đáp: vì sao gọi API trong useEffect? [] nghĩa là gì?
  // TODO 2: featured = games.filter(g => g.featured)      (dữ liệu suy ra, KHÔNG phải state)
  //         onSale   = games.filter(g => g.discount > 0)
  // TODO 3: render <StatusMessage />, rồi mỗi nhóm là 1 <section> dùng map + <GameCard key={game.id} />
  return (
    <Container className="py-4">
      <h1>Trang chủ</h1>
    </Container>
  );
}
