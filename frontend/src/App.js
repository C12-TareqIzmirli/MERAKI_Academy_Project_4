import React, { createContext, useState } from "react";
import "./App.css";

import Home from "./pages/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./pages/About";
import Details from "./pages/Details/Details";
import Navbar from "./components/Navbar";
import Application from "./pages/Application";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import CreateJob from "./pages/CreateJob/CreateJob";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Search from "./pages/Search";

export const userContext = createContext();
const App = () => {
  // const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogged, setIsLogged] = useState(false);
  return (
    <userContext.Provider value={{ token, setToken, isLogged, setIsLogged }}>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="createJob" element={<CreateJob />} />
          <Route path="/details/:jobId" element={<Details />} />
          <Route path="/search/:title" element={<Search />} />
          <Route path="/application/:jobId" element={<Application />} />
        </Routes>
      </div>
    </userContext.Provider>
  );
};

export default App;
