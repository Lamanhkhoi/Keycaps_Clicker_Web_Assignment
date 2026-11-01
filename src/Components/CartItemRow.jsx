import { Button } from "react-bootstrap";
import { formatPrice } from "../utils/price";

// 1 dòng trong trang giỏ hàng.
// item = { id, name, image, price, qty }  (xem cartReducer.js)
export default function CartItemRow({ item }) {
  // TODO: const { dispatch } = useCart();
  //   - nút "-" / "+" → dispatch({ type: "UPDATE_QTY", payload: { id: item.id, qty: ... } })
  //   - nút "Remove" → dispatch({ type: "REMOVE", payload: item.id })
  return (
    <div className="d-flex align-items-center gap-3 py-2 border-bottom">
      <img src={item.image} alt={item.name} width={120} />
      <div className="flex-grow-1">
        <div>{item.name}</div>
        <div>{formatPrice(item.price)} × {item.qty}</div>
      </div>
      <strong>{formatPrice(item.price * item.qty)}</strong>
      <Button variant="outline-danger" size="sm">Remove</Button>
    </div>
  );
}
