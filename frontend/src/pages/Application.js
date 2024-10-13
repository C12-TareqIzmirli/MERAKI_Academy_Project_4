import axios from "axios";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";

const Application = () => {
  const { jobId } = useParams();
  const { token, setToken } = useContext(userContext);
  // console.log(token);
  const [cv, setCv] = useState();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  // const cloudRef = useRef();
  // const widgetRef = useRef();
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
            console.log(response);
            console.log("applied");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   cloudRef.current = window.cloudinary;
  //   widgetRef.current = cloudRef.current.createUploadWidget(
  //     {
  //       cloudName: "dkfgu5kyb",
  //       uploadPreset: "tjqr97xi",
  //     },
  //     function (err, result) {
  //       console.log(result);
  //     }
  //   );
  // }, []);
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
      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={url} />
      </div>
    </div>
  );
};

export default Application;
