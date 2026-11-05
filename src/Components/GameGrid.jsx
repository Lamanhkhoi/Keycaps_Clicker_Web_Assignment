import { Col, Row } from 'react-bootstrap'
import GameCard from './GameCard'

// Lưới nhiều GameCard, dùng ở Trang chủ và trang Cửa hàng.
// Bootstrap grid: 1 cột điện thoại, 2 cột tablet, 3 và 4 cột màn hình lớn.
export default function GameGrid({ games }) {
  if (games.length === 0) {
    return <p>Không tìm thấy game nào.</p>
  }

  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {/* key giúp React biết phần tử nào là phần tử nào khi danh sách thay đổi */}
      {games.map((game) => (
        <Col key={game.id}>
          <GameCard game={game} />
        </Col>
      ))}
    </Row>
  )
}
