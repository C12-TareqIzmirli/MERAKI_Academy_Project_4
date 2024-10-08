import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";

const Application = () => {
  const { jobId } = useParams();
  const { token, setToken } = useContext(userContext);
  // console.log(token);
  const [cv, setCv] = useState();

  const applyForJob = (req, res) => {
    axios
      .post(
        `http://localhost:5000/apps/apply/${jobId}`,
        { attatchments: cv },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("applied");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Apply for job</h1>

      <input
        onChange={(e) => {
          setCv(e.target.value);
        }}
      />
      <button onClick={applyForJob}>Apply</button>
    </div>
  );
};

export default Application;
