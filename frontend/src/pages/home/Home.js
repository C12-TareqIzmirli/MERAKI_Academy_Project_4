import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./home.css";


const Home = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/jobs/all")
      .then((response) => {
        console.log(response.data);
        setJobs(response.data.job);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const job = jobs.map((item) => {
    return (
      <div className="product-card" key={item._id}>
        <div className="product-info">
          <h2>{item.title}</h2>
          <p>Comapny: {item.company}</p>
          <p>Expiry Date{item.expiryDate}</p>
          <Link className="btn btn-primary" to={`/details/${item._id}`}>
            More Details
          </Link>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h1>Jobs</h1>

      <div className="container">{job}</div>
    </div>
  );
};

export default Home;
