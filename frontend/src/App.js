import React from "react";
import "./App.css";

import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Details from "./pages/Details";

const App = () => {
  return (
    <div>
      <nav>
        <h1>Hello</h1>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/details/:jobId" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
