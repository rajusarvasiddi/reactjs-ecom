// src/pages/Cart.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { clearCart, updateQuantity } from "../../store/cartSlice";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalCount = cartItems.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart ({totalCount} items)</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item: any) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.name} />
              <div>
                <h3>{item.title}</h3>
                <p>₹{item.price}</p>
                <p>⭐ {item.rating}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                >
                  –
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div>
            <button
              className="clear-cart-btn"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
