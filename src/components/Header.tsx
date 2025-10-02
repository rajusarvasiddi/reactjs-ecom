import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <h2>My App</h2>
        <nav>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/products">Products</Link> &nbsp;
          <Link to="/about">About</Link> &nbsp;
          <Link to="/login">Login</Link> &nbsp; (Cart Products: 10)
        </nav>
      </header>
    </>
  );
};

export default Header;
