import React, { useState } from "react";

import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { ROLES } from "../components/Navbar/Navbar";

const Register = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();
  const [userId, setUserId] = useState();

  console.log(role);

  const signUp = () => {
    axios
      .post("http://localhost:5000/users/register", {
        userName: userName,
        email: email,
        phone: phone,
        password: password,
        role: role,
      })
      .then((response) => {
        console.log(response.data);
        const role = response.data.user.role;
        const userId = response.data.user._id;
        localStorage.setItem("user_id", userId);
        localStorage.setItem("role", role);
        setUserId(response.data.user._id);
        setRole(response.data.user.role);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput
            wrapperClass="mb-4"
            label="Your Name"
            size="lg"
            id="form1"
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Your Email"
            size="lg"
            id="form2"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Phone"
            size="lg"
            id="form4"
            type="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="form3"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div>
            <select
              className="form-select"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value={ROLES.publisher}>Publisher</option>
              <option value={ROLES.user}>User</option>
            </select>
          </div>

          <Link
            className="btn btn-primary btnsignup"
            to="/login"
            onClick={signUp}
          >
            Register
          </Link>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register;
