import { Link } from "react-router-dom";
import TruncateText from "../utils/TruncateText";
import "./ProductCard.css";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
};

const ProductCard = ({ product }: { product: Product }) => {
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
      <p>{TruncateText(product.description, 60)}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <button
        className="add-to-cart-btn"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
      {/* <div className="rating">
          Rating {product.rating}
        </div> */}
    </div>
  );
};

export default ProductCard;
