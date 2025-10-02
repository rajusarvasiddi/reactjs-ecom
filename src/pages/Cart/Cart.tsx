import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="cart-page">
      <h2>Your Cart ({cartItems.length} items)</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item: any) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <p>⭐ {item.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
