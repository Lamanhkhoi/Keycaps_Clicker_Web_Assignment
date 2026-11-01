import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PriceTag from "./PriceTag";

// Presentational component: chỉ NHẬN props và hiển thị, không tự gọi API, không giữ state.
// game = { id, name, genre, image, price, discount, ... } (1 phần tử của mảng games)
export default function GameCard({ game }) {
  return (
    <Card className="game-card h-100">
      <Card.Img variant="top" src={game.image} alt={game.name} />
      <Card.Body>
        <Card.Title as="h5">
          <Link to={`/products/${game.id}`}>{game.name}</Link>
        </Card.Title>
        <Card.Text>{game.genre}</Card.Text>
        <PriceTag game={game} />
        {/* TODO: nút "Add to cart" → const { dispatch } = useCart();
            dispatch({ type: "ADD", payload: ... }) — payload là gì? (xem cartReducer.js) */}
      </Card.Body>
    </Card>
  );
}
