// src/components/Header.tsx
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

const Header = () => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header>
      <h2>My App</h2>
      <nav>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/products">Products</Link>&nbsp;
        <Link to="/about">About</Link>&nbsp;
        <Link to="/login">Login</Link>&nbsp;
        <Link to="/cart">Cart ({cartCount})</Link>
      </nav>
    </header>
  );
};

export default Header;
