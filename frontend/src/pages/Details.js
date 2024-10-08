import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs//job/${jobId}`)
      .then((response) => {
        console.log(response.data);
        setJob(response.data.job);
      })
      .catch((err) => {});
  }, []);

  // const jobDetails = job?.map((item) => {
  //   return (
  //     <div>
  //       <div className="detailsImage">
  //         <img src={item.image} />
  //       </div>
  //       <h1>{item.title}</h1>
  //     </div>
  //   );
  // });
  return (
    <div className="jobDetails">
      <h1>Job Details</h1>
      <div className="image">
        <img src={job.image} alt="No pic" />
      </div>
      <h1>{job.title}</h1>
      <Link to={`/application/${job._id}`}>Apply Fot Job</Link>
    </div>
  );
};

export default Details;
