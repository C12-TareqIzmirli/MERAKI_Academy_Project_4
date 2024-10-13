import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, redirect, useNavigate } from "react-router-dom";
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
import Search from "../pages/Search";

const Navbar = () => {
  const [jobs, setJobs] = useState();
  const navigate = useNavigate();
  const [openBasic, setOpenBasic] = useState(false);
  const [name, setName] = useState();
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

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer>
        <MDBNavbarBrand>
          <Link to="/">Wazfine</Link>
        </MDBNavbarBrand>
        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink to="/home" active aria-current="page" href="#">
                <Link to="/">Home</Link>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink>
                <Link to="/about">About Us</Link>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Search />
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
