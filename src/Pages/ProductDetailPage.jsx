import { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getGameById } from '../api/gameApi'
import PriceTag from '../Components/PriceTag'
import StatusMessage from '../Components/StatusMessage'
import { useCart } from '../context/CartContext'

// Trang chi tiết game, đường dẫn dạng /products/:id
export default function ProductDetailPage() {
  // useParams lấy id từ URL. Chú ý: id luôn là CHUỖI, ví dụ '5'
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useCart()

  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Dependency [id]: mỗi khi id trên URL đổi thì gọi lại API
  useEffect(() => {
    getGameById(id)
      .then((data) => setGame(data))
      // id không tồn tại -> MockAPI trả 404 -> axios reject -> vào .catch
      .catch(() => setError('Không tìm thấy game này.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    dispatch({ type: 'ADD', payload: game })
  }

  // navigate(-1): quay lại trang trước trong lịch sử trình duyệt
  const handleBack = () => {
    navigate(-1)
  }

  // Đang tải hoặc lỗi -> chỉ hiện trạng thái + nút quay lại
  if (loading || error !== '') {
    return (
      <Container className="py-4">
        <StatusMessage loading={loading} error={error} />
        <Button variant="secondary" onClick={handleBack}>
          Quay lại
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Button variant="secondary" size="sm" className="mb-3" onClick={handleBack}>
        Quay lại
      </Button>

      <Row className="g-4">
        <Col md={7}>
          <img src={game.image} alt={game.name} className="img-fluid detail-image" />
        </Col>
        <Col md={5}>
          <div className="detail-panel">
            <h1>{game.name}</h1>
            <div className="mb-2">
              {game.tags.map((tag) => (
                <Badge key={tag} bg="info" className="me-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <p>{game.description}</p>
            <p className="mb-1">Nhà phát triển: {game.developer}</p>
            <p className="mb-1">Ngày phát hành: {game.releaseDate}</p>
            <p>Lượt đánh giá: {game.recommendations.toLocaleString()}</p>
            <div className="price-box mb-3">
              <PriceTag game={game} />
            </div>
            <Button variant="success" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
