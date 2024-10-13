import axios from "axios";

import React, { useEffect, useState, useContext, useRef } from "react";
import { userContext } from "../../App";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const CreateJob = () => {
  const { token, setTokenm, setIsLogged, isLogged } = useContext(userContext);
  const cloudRef = useRef();
  const widgetRef = useRef();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [status, setStatus] = useState("Open");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png"
  );
  const [company, setCompany] = useState();
  const [category, setCategory] = useState();
  //const [categories, setCategories] = useState();

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "fx7zcl7e");
    data.append("cloud_name", "dkfgu5kyb");
    fetch("  https://api.cloudinary.com/v1_1/dkfgu5kyb/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => {
        resp.json();
        console.log(resp);
      })
      .then((data) => {
        console.log(data);

        setUrl(data.url);
        axios
          .post(
            "http://localhost:5000/jobs/new",
            {
              title: title,
              description: description,
              expiryDate: expiryDate,
              image: data.url,
              company: company,
              category: category,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            console.log("Created");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };
  const createJob = (req, res) => {
    axios
      .post(
        "http://localhost:5000/jobs/new",
        {
          title: title,
          description: description,
          expiryDate: expiryDate,
          image: url,
          company: company,
          category: category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Created");
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
            label="Job Title"
            size="lg"
            id="form1"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Description"
            size="lg"
            id="form2"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            type="date"
            onChange={(e) => {
              setExpiryDate(e.target.value);
            }}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <MDBInput
            wrapperClass="mb-4"
            label="Comapny"
            size="lg"
            id="form2"
            type="email"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />

          <div>
            <select
              className="form-select"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value={"6700210fb01d8bdca8305059"}>IT</option>
              <option value={"67002195b01d8bdca830505f"}>Developer</option>
            </select>
          </div>
          <Link className="btn btn-primary btnsignup" onClick={uploadImage}>
            Register
          </Link>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default CreateJob;
