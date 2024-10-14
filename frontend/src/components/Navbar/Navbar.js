import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import "./Navbar.css";

const Navbar = () => {
  const { token, setToken, setIsLogged, isLogged } = useContext(userContext);

  const logout = () => {
    localStorage.clear();
  };
  return (
    <nav className="navbar sticky-top">
      <div className="nav-left">
        <Link className="logo" to="/">
          Wazfine
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About US</Link>
        <Link to="/search">Search</Link>
      </div>

      <div className="nav-right">
        {isLogged ? (
          <Link to="/" className="login-btn" onClick={logout}>
            Logout
          </Link>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
      {console.log(isLogged)}
    </nav>
  );
};

export default Navbar;
