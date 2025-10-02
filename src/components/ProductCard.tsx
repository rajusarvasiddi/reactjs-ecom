import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, Product } from "../store/cartSlice";
import { RootState } from "../store/store";
import "./ProductCard.css";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>⭐ {product.rating}</p>
      <div className="product-actions">
        <button
          className="remove-btn"
          onClick={() => dispatch(removeFromCart(product.id))}
          disabled={quantity === 0}
        >
          -
        </button>
        <div className="inCart">{quantity}</div>
        <button
          className="add-to-cart-btn"
          onClick={() => dispatch(addToCart(product))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
