import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import PriceTag from './PriceTag'

// Thẻ hiển thị 1 game. Props: game = { id, name, genre, image, price, discount, ... }
export default function GameCard({ game }) {
  const { dispatch } = useCart()

  // Bấm 'Thêm vào giỏ' -> gửi action ADD kèm cả object game cho cartReducer
  const handleAddToCart = () => {
    dispatch({ type: 'ADD', payload: game })
  }

  return (
    <Card className="game-card h-100">
      <Link to={`/products/${game.id}`}>
        <Card.Img variant="top" src={game.image} alt={game.name} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5">
          <Link to={`/products/${game.id}`} className="game-title-link">
            {game.name}
          </Link>
        </Card.Title>
        <Card.Text className="game-genre">{game.genre}</Card.Text>
        {/* mt-auto đẩy giá + nút xuống đáy thẻ, các thẻ cao bằng nhau */}
        <div className="mt-auto">
          <div className="mb-2">
            <PriceTag game={game} />
          </div>
          <Button size="sm" variant="success" className="w-100" onClick={handleAddToCart}>
            Thêm vào giỏ
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
