import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import axios from "axios";

const Navbar = () => {
  const [name, setName] = useState();
  const [openBasic, setOpenBasic] = useState(false);
  const serachByName = (req, res) => {
    axios
      .get(`http://localhost:5000/jobs/${name}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
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
          </MDBNavbarNav>

          <MDBInputGroup righ tag="form" className="d-flex w-auto mb-3">
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
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
