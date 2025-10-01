import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import TruncateText from "../../utils/TruncateText";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=10")
      .then((res) => setProducts(res.data.products))
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className="products-container">
        <h1>Our Products</h1>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.thumbnail} alt={product.name} />
              </Link>
              <h3>{product.name}</h3>
              <p>{TruncateText(product.description, 70)}</p>
              <span className="price">${product.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
