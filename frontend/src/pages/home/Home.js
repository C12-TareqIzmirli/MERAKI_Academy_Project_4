import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./home.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

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
      // <div className="jobCard">
      //   <div className="">
      //     <img src={item.image} />
      //     <h4>{item.title}</h4>
      //     <p>{item.company}</p>
      //     <p>{item.date}</p>
      //     <Link to={`/details/${item._id}`}>More Details</Link>
      //   </div>
      // </div>
      <div>
        <MDBCard className="cards">
          <MDBCardImage src={item.image} position="top" alt="..." />
          <MDBCardBody>
            <MDBCardTitle>{item.title}</MDBCardTitle>
            <MDBCardText>{item.description}</MDBCardText>
            <Link className="btn btn-primary" to={`/details/${item._id}`}>
              More Details
            </Link>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  });
  return (
    <div>
      <h1>Home Page</h1>
      <p>Home page </p>
      <div className="cardContainer">{job}</div>
    </div>
  );
};

export default Home;
