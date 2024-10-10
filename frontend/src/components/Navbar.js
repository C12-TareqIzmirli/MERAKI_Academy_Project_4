import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className=" navbar navbar-expand-lg navbar-light bg-light">
        <h2>Logo</h2>

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        <Link className="login" to="/login">Login</Link>
      </nav>
    </div>
  );
};

export default Navbar;
