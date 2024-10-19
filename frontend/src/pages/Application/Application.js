import axios from "axios";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../App";

import "./Application.css";
const Application = () => {
  const { jobId } = useParams();
  const { token, setToken, isLogged } = useContext(userContext);
  const [err, setError] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "fx7zcl7e");
    data.append("cloud_name", "dkfgu5kyb");
    fetch(
      "  https://api.cloudinary.com/v1_1/dkfgu5kyb/image/upload",
      {
        method: "post",
        body: data,
      },
      {
        formart: "pdf",
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        if (!isLogged) {
          setError("Login first");
        }
        axios
          .post(
            `http://localhost:5000/apps/apply/${jobId}`,
            { attatchments: data.url },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setError(response.data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="cont">
      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          name="resume"
          accept=".pdf, .doc, .docx"
          required
        />
        <button onClick={uploadImage}>Upload</button>
      </div>

      <div className="warning">
        <p class="modal-dialog modal-dialog-scrollable">{err}</p>
      </div>
    </div>
  );
};

export default Application;
