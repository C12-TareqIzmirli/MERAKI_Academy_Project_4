import React from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { jobId } = useParams();
  return (
    <div>
      <h1>{jobId}</h1>
      <h1>Details</h1>
    </div>
  );
};

export default Details;
