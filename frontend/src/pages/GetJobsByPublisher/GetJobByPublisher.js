import axios from "axios";
import React, { useEffect, useState } from "react";

function GetJobByPublisher() {
  const publisher = "670c21b94031650e713d1a52";
  const [jobs, setJobs] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs/publisher/${publisher}`)
      .then((response) => {
        console.log(response);
        setJobs(response.data.job);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const job = jobs?.map((item) => {
    return (
      <div className="product-card" key={item._id}>
        <div className="product-info">
          <h2>{item.title}</h2>
          <p>Comapny: {item.company}</p>
          <p>Expiry Date{item.expiryDate}</p>
          
        </div>
      </div>
    );
  });
  return <div>{job}</div>;
}

export default GetJobByPublisher;
