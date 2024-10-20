const { response } = require("express");
const jobModel = require("../models/jobSchema");

const createJob = (req, res) => {
  const {
    title,
    description,
    expiryDate,
    company,
    status,
    category,
    applicatin,
  } = req.body;
  const publisher = req.token.userId;
  const job = new jobModel({
    title,
    description,
    expiryDate,
    company,
    status,
    publisher: publisher,
    category,
    applicatin,
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
    .populate("comments", "-_id")

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

const getJobById = (req, res) => {
  const jobId = req.params.id;

  jobModel
    .findById(jobId)
    .populate("comments", "-_id -commenter -__v")
    .populate("category", "-_id -__v -description")
    .then((response) => {
      if (!response) {
        res.status(404).json({
          success: false,
          message: "No job with this ID",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Job Found",
          job: response,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

const getJobsByCompany = (req, res) => {
  const companyName = req.params.id;
  //console.log(req.params.name);

  // console.log(companyName);

  jobModel
    .find({ company: companyName })
    .then((response) => {
      if (response.length === 0) {
        console.log(response);

        res.status(404).json({
          success: false,
          message: "No job for this Company",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Job Found for this company",
          job: response,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};
const getJobsByCategory = (req, res) => {
  const category = req.params.id;

  jobModel
    .find({ category: category })
    .then((response) => {
      if (!response) {
        res.status(404).json({
          success: false,
          message: "No jobs with this category",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Job Found for this category",
          jobs: response,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

const updateJobByPublisher = (req, res) => {
  const publisher = req.token.userId;
  const jobId = req.params.id;

  const { title, description, expiryDate } = req.body;

  jobModel
    .findByIdAndUpdate(
      { _id: jobId },
      {
        title: title,
        description: description,
        expiryDate: expiryDate,
        publisher: publisher,
      },
      { new: true }
    )
    .then((response) => {
      if (!response) {
        res.status(404).json({
          success: false,
          message: "No job for this Publisher",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Job updated",
          job: response,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

const GetJobByPublisher = (req, res) => {
  const publisher = req.params.id;

  jobModel
    .find({ publisher: publisher })
    .then((response) => {
      if (!response) {
        console.log(response);

        res.status(404).json({
          success: false,
          message: "No job for that publisher",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Job Found for that publisher",
          job: response,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

const getJobByName = (req, res) => {
  const jobTitle = req.params.title;

  jobModel
    .find({ title: jobTitle })
    .then((response) => {
      if (response.length === 0) {
        res.status(404).json({
          success: false,
          message: "No jobs with this title",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Job Found for this title",
          jobs: response,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

const deleteJobById = (req, res) => {
  const jobId = req.params.id;
  const publisher = req.token.userId;
  jobModel
    .findByIdAndDelete({ _id: jobId, publisher: publisher })
    .then((response) => {
      if (!response) {
        res.status(404).json({
          success: false,
          message: "No job with this ID",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Job Deleted",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

const changeStatus = (req, res) => {
  const jobId = req.params.id;

  jobModel
    .findByIdAndUpdate(jobId, { status: "Expierd" })
    .then((response) => {
      if (!response) {
        res.status(200).json({
          success: false,
          message: "No job with this ID",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Status changed",
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

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getJobsByCompany,
  updateJobByPublisher,
  getJobsByCategory,
  getJobByName,
  deleteJobById,
  changeStatus,
  GetJobByPublisher,
};
