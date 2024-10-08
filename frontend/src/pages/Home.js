import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

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
      <div className="jobCard">
        <div className="">
          <img src={item.image} />
          <h4>{item.title}</h4>
          <p>{item.company}</p>
          <p>{item.date}</p>
          <Link  to={`/details/${item._id}`} >Details</Link>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h1>Home Page</h1>
      <p>Home page </p>
      {job}
    </div>
  );
};

export default Home;
