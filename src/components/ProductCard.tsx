import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, Product } from "../store/cartSlice";
import { RootState } from "../store/store";
import "./ProductCard.css";
import { Link } from "react-router-dom";

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
      <Link to={`/products/${product.id}`} className="product-link">
        <img src={product.thumbnail} alt={product.title} />
      </Link>
      <h3>{product.title}</h3>
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
