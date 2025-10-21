import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../../store/cartSlice";
import { RootState } from "../../store/store";
import renderStars from "../../utils/RenderStars";
import "./ProductDetails.css";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
};

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product?.id);
  const quantity = cartItem?.quantity ?? 0;

  useEffect(() => {
    if (id) {
      axios
        .get("https://dummyjson.com/products/" + id)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch((error) => {
          "Failed to feetch product details";
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      {
        <div className="product-details">
          <h1>{product.title}</h1>
          <img src={product.thumbnail} alt={product.title} />
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Rating:</strong> {renderStars(product.rating)}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <div className="gallery">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`Gallery ${index}`} />
            ))}
          </div>
          <div className="product-details-actions">
            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(product.id))}
              disabled={quantity === 0}
            >
              –
            </button>
            <span>{quantity}</span>
            <button
              className="add-to-cart-btn"
              onClick={() => dispatch(addToCart(product))}
            >
              +
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default ProductDetails;
