import { formatPrice, getFinalPrice } from "../utils/price";

// Hiển thị giá giống Steam: có giảm thì hiện "-75%", giá gốc gạch ngang, giá mới.
export default function PriceTag({ game }) {
  // TODO: if (game.discount > 0) → render badge "-{discount}%" + <s>giá gốc</s> + giá sau giảm
  //       (class gợi ý: "discount-badge", "price-tag" đã có chỗ trong styles/theme.css)
  return <span className="price-tag">{formatPrice(getFinalPrice(game))}</span>;
}
