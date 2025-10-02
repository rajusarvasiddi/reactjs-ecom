import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";

const Header = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  return (
    <>
      <header>
        <h2>My App</h2>
        <nav>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/products">Products</Link> &nbsp;
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/about">About</Link> &nbsp;
        </nav>
      </header>
    </>
  );
};

export default Header;
