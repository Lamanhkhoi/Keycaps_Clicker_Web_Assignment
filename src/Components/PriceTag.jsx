import { formatPrice, getFinalPrice } from '../utils/price'


export default function PriceTag({ game }) {
  const finalPrice = getFinalPrice(game)

  if (game.discount > 0) {
    return (
      <div className="d-flex align-items-center gap-2">
        <span className="discount-badge">-{game.discount}%</span>
        <span className="original-price">
          <s>{formatPrice(game.price)}</s>
        </span>
        <span className="price-tag">{formatPrice(finalPrice)}</span>
      </div>
    )
  }

  return (
    <div>
      <span className="price-tag">{formatPrice(finalPrice)}</span>
    </div>
  )
}
