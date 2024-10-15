import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";

function GetJobByPublisher() {
  const { token, setToken, setIsLogged, isLogged, userId, setUserId } =
    useContext(userContext);
  const [jobs, setJobs] = useState();
  const [jobId, setJobId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [isUpdateActive, setIsUpdateActive] = useState(false);
  console.log(userId);

  const updateJob = (index, jobId) => {
    console.log(jobId);

    axios
      .put(
        `http://localhost:5000/jobs/update/${jobId}`,
        {
          title: title,
          description: description,
          expiryDate: expiryDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setIsUpdateActive(true);
        // const newJobArr = [...jobs];
        // newJobArr[index] = {};
       let  updatedJob = jobs.map((elem,i)=>{
            if(elem._id ==jobId ){
                elem = response.data.job
            }
            return elem
        })
        setJobs(updatedJob);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteJob = (jobId) => {
    axios
      .delete(`http://localhost:5000/jobs/remove/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        const newarr = jobs.filter((item) => {
          return item._id !== jobId;
        });
        setJobs(newarr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs/publisher/${userId}`)
      .then((response) => {
        console.log(response);
        setJobs(response.data.job);
        //setJobId(response.data.job[0]._id);
        console.log(response.data.job[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const job = jobs?.map((item, index) => {
    return (
      <div className="product-card" key={item._id}>
        <div className="product-info">
          <h2>Job Title : {item.title}</h2>
          <p>Description: {item.description}</p>
          <p>Expiry Date: {item.expiryDate}</p>
        </div>

        <button
          className="btn btn-success"
          onClick={() => {
            console.log(index, item._id);
            updateJob(index, item._id);
          }}
        >
          Update
        </button>
        <button className="btn btn-danger" onClick={() => deleteJob(item._id)}>
          Delete
        </button>
        {isUpdateActive && (
          <div>
            <input
              placeholder="Change Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              placeholder="Change Description"
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
          </div>
        )}
      </div>
    );
  });

  return <div>{job}</div>;
}

export default GetJobByPublisher;
