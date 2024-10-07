import React, { useState } from "react";
import { Button, DropdownItem, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();

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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container-sm content">
      <div>
        <label>User-Name</label>
        <input
          type="text"
          className="FormControl"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="text"
          className="FormControl"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          type="integer"
          className="FormControl"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="Password"
          className="FormControl"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div>
        <select className="form-select">
          <option
            value={"6702ba9b793c1b98a784ba10"}
            onSelect={(e) => {
              setRole(e.target.value);
            }}
          >
            Publisher
          </option>
          <option value={"66ff03d084b9d7fcbdfb1f1f"}>User</option>
        </select>
      </div>
      <Button onClick={signUp}>Register</Button>
    </div>
  );
};

export default Register;
