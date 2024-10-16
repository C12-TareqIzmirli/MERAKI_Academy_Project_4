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
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { GoogleLogin } from "@react-oauth/google";
import { useStyleRegister } from "antd/es/theme/internal";

const Login = () => {
  const { isLogged, setIsLogged, role, setRole, userId, setUserId } =
    useContext(userContext);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  //const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const signIn = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        const token = localStorage.setItem("token", response.data.token);
        setToken(token);
        localStorage.setItem("user_id", response.data.user._id);
        localStorage.setItem("role", response.data.user.role._id);
        setUserId(response.data.user._id);
        setRole(response.data.user.role._id);

        localStorage.setItem("isLogged", true);

        setIsLogged(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setIsError(true);
        console.log(error);
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
                required="true"
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
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const cre = credentialResponse.credential;
                  console.log(cre);

                  navigate("/");
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />

              <p className="small mb-3 pb-lg-2">
                <a class="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              <Link
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
      <div className="err">{error}</div>
    </MDBContainer>
  );
};

export default Login;
