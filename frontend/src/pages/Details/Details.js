import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../../App";
import "./Details.css";

const Details = () => {
  const { token, setToken, setIsLogged, isLogged } = useContext(userContext);
  const { jobId } = useParams();
  const [job, setJob] = useState([]);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [err, setError] = useState("");

  const [category, setCategory] = useState();
  console.log();
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
      setError("Login first");
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
    <>
      <div className="product-details">
        <h1>{job.title}</h1>
        <p>
          <strong>Description:</strong> {job.description}
        </p>
        <p>
          <strong>Expiry Date:</strong> {job.expiryDate}
        </p>
        <p>
          <strong>Date:</strong> {job.date}
        </p>
        <p>
          <strong>Comapny:</strong> {job.company}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>

        <p>
          <strong>comments:</strong> {showComments}
        </p>
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>
        <button onClick={addComment} className="btn btn-success">
          addComment
        </button>
      </div>
      <div className="applyDiv">
        <Link
          className="btn btn-success btnApply"
          to={`/application/${job._id}`}
        >
          Apply Now
        </Link>
      </div>
      <div className="warning">
        <p class="modal-dialog modal-dialog-scrollable">{err}</p>
      </div>
    </>
  );
};

export default Details;
