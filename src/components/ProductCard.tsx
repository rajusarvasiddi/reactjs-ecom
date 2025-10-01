import { Link } from "react-router-dom";
import TruncateText from "../utils/TruncateText";
import "./ProductCard.css";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="product-card">
      <Link
        to={`/products/${product.id}`}
        aria-label={`View details of ${product.name}`}
      >
        <img src={product.thumbnail} alt={product.name} />
      </Link>
      <h3>{product.name}</h3>
      <p>{TruncateText(product.description, 70)}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      {/* <div className="rating">
          Rating {product.rating}
        </div> */}
    </div>
  );
};

export default ProductCard;
