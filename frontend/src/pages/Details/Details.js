import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../../App";
import "./Details.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBTextArea,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const Details = () => {
  const { token, setTokenm, setIsLogged, isLogged } = useContext(userContext);
  const { jobId } = useParams();
  const [job, setJob] = useState([]);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [err, setError] = useState("");

  const [category, setCategory] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs/job/${jobId}`)
      .then((response) => {
        console.log(response.data);
        setJob(response.data.job);
        setAllComment(response.data.job.comments);
        setCategory(response.data.job.category.title);
      })
      .catch((err) => {});
  }, []);
  console.log(isLogged);

  const addComment = (req, res) => {
    if (!isLogged) {
      setError("Login first ");
    } else {
      axios
        .post(
          `http://localhost:5000/jobs/comment/${jobId}`,
          { comment: comment },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log("Added");
          const com = response.data.comment;
          setAllComment([...allComment, com]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showComments =
    allComment.length &&
    allComment.map((com) => {
      return <p>{com.comment}</p>;
    });

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={job.image}
                  alt="avatar"
                  style={{ width: "300px" }}
                  fluid
                />
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <Link
                      className="btn btn-success"
                      to={`/application/${job._id}`}
                    >
                      Apply Now
                    </Link>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Job Title</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {job.title}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Description</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {job.description}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Expiry Date</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {job.expiryDate}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Company</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {job.company}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Category</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{category}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>comments</MDBCardBody>

                  <MDBCardBody>{showComments}</MDBCardBody>
                </MDBCard>
                <MDBCard className="mb-4 mb-md-0">
                  <MDBTextArea
                    label="Add comment"
                    id="textAreaExample"
                    rows="{4}"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <MDBBtn onClick={addComment}>addComment</MDBBtn>
                  <MDBCardBody>{err}</MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Details;
