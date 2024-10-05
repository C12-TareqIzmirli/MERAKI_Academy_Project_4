const { response } = require("express");
const jobModel = require("../models/jobSchema");

const createJob = (req, res) => {
  const {
    title,
    description,
    expiryDate,
    image,
    company,
    publisher,
    category,
  } = req.body;

  const date = new Date();
  //const publisher = req.token.userId;

  const job = new jobModel({
    title,
    description,
    date,
    expiryDate,
    image,
    company,
    publisher,
    category,
  });
  console.log(job);

  job
    .save()
    .then((response) => {
      res.status(201).json({
        success: true,
        message: `Job created`,
        job: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllJobs = (req, res) => {
  //const publisher = req.token.userId;

  jobModel
    .find()
    .populate("category", "-_id --v")

    .then((response) => {
      if (response.length) {
        res.status(200).json({
          success: true,
          message: "All jobs",
          job: response,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No job yet",
        });
      }
    })
    .catch((err) => {
      res.status(200).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};
module.exports = { createJob, getAllJobs };
