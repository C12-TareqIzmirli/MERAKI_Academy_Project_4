import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import "./Navbar.css";

export const ROLES = {
  publisher: "6702ba9b793c1b98a784ba10",
  user: "66ff03d084b9d7fcbdfb1f1f",
};

const Navbar = () => {
  const { token, setToken, setIsLogged, isLogged, role, setRole } =
    useContext(userContext);

  const logout = () => {
    localStorage.clear();
    setIsLogged(false);
    setRole("");
  };

  console.log({ role });

  return (
    <nav className="navbar sticky-top">
      <div className="nav-left">
        <Link className="logo" to="/">
          Wazfine
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About US</Link>
        <Link to="/search">Search</Link>
        {role === ROLES.publisher ? (
          <Link to="/createjob">Create Jobs</Link>
        ) : (
          <></>
        )}
        {role === ROLES.publisher && (
          <Link to="/getjobsbypublisher">My Jobs</Link>
        )}
      </div>

      <div className="nav-right">
        {isLogged ? (
          <Link to="login" className="login-btn" onClick={logout}>
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
