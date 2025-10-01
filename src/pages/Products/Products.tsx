import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => setProducts(res.data.products))
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className="products-container">
        <h1>Our Products</h1>
        <div className="product-grid">
          {products.map((product) => (
            // <div className="product-card" key={product.id}>
            //   <Link to={`/products/${product.id}`}>
            //     <img src={product.thumbnail} alt={product.name} />
            //   </Link>
            //   <h3>{product.name}</h3>
            //   <p>{TruncateText(product.description, 70)}</p>
            //   <p>{product.rating}</p>
            //   <span className="price">${product.price.toFixed(2)}</span>
            // </div>
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
