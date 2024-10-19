import React, { useState, useContext } from "react";
import {
  Link,
  Navigate,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./Search.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import axios from "axios";
const Search = () => {
  const [jobs, setJobs] = useState();
  const [name, setName] = useState();
  const title = useParams();
  const navigate = useNavigate();
  const serachByName = (req, res) => {
    axios
      .get(`http://localhost:5000/jobs/${name}`)
      .then((response) => {
        console.log(response);
        setJobs(response.data.jobs);
        navigate("/search");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const job = jobs?.map((j) => {
    return (
      <div className="product-card" key={j._id}>
        <div className="product-info">
          <h2>{j.title}</h2>
          <p>Comapny: {j.company}</p>
          <p>Expiry Date{j.expiryDate}</p>
          <Link className="btn btn-primary" to={`/details/${j._id}`}>
            More Details
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div>
      <MDBInputGroup righ className="d-flex w-auto mb-3">
        <input
          className="form-control"
          placeholder="Type query"
          aria-label="Search"
          type="Search"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <MDBBtn outline onClick={serachByName}>
          Search
        </MDBBtn>
      </MDBInputGroup>
      {job}
    </div>
  );
};

export default Search;
