import axios from "axios";
import React, { useState, useContext } from "react";
import "./Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

const Login = () => {
  const { isLogged, setIsLogged } = useContext(userContext);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  const signIn = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        const token = localStorage.setItem("token", response.data.token);
        setToken(token);
        setIsLogged(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <MDBContainer fluid className="contect">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />

              <p className="small mb-3 pb-lg-2">
                <a class="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              <Link
                to="/"
                outline
                className="mx-2 px-5 btn btn-primary"
                color="white"
                size="lg"
                onClick={signIn}
              >
                Login
              </Link>

              <div>
                <p className="mb-0">
                  Don't have an account? <Link to="/Register">Sign Up</Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
