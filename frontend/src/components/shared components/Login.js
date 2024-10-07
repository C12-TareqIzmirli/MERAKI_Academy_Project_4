import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Login = () => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <label>Email</label>
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button onClick={signIn}>Login</Button>
    </div>
  );
};

export default Login;
