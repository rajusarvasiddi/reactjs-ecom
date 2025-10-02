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
          <Link to="/about">About</Link> &nbsp;
          <Link to="/login">Login</Link> &nbsp; (Cart Products: {cartCount})
        </nav>
      </header>
    </>
  );
};

export default Header;
