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
  MDBRipple,
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

      <MDBCard className="Container">
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
        >
          <MDBCardImage src={item.image} fluid alt="..." />
          <a>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </a>
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle>{item.title}</MDBCardTitle>
          <MDBCardTitle>{item.description}</MDBCardTitle>

          <Link className="btn btn-primary" to={`/details/${item._id}`}>
            More Details
          </Link>
        </MDBCardBody>
      </MDBCard>
    );
  });
  return (
    <div>
      <h1>Home Page</h1>

      <div className="cardContainer">{job}</div>
    </div>
  );
};

export default Home;
