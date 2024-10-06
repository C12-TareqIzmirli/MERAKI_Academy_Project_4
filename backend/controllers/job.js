const { response } = require("express");
const jobModel = require("../models/jobSchema");

const createJob = (req, res) => {
  const { title, description, expiryDate, image, company, status, category } =
    req.body;
  const publisher = req.token.userId;
  //   const date = new Date();
  const job = new jobModel({
    title,
    description,
    expiryDate,
    image,
    company,
    status,
    publisher: publisher,
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

  const { title, description } = req.body;

  jobModel
    .findByIdAndUpdate({
      jobId,
      publisher: publisher,
      title: title,
      description: description,
    })
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

const getJobByName = (req, res) => {
  const jobTitle = req.params.id;

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
    .findByIdAndDelete({ jobId, publisher: publisher })
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
};
