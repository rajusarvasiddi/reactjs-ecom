// src/components/ProductCard.tsx
import { useDispatch } from "react-redux";
import { addToCart, Product } from "../store/cartSlice";
import "./ProductCard.css";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <Link
        to={`/products/${product.id}`}
        aria-label={`View details of ${product.name}`}
      >
        <img src={product.thumbnail} alt={product.name} />
      </Link>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>⭐ {product.rating}</p>
      <button
        className="add-to-cart-btn"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
