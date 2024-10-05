
const jobModel = require("../models/jobSchema");

const createJob = (req, res) => {
  const { title, description, expiryDate, image, company, category } = req.body;

  const date = new Date();
  const publisher = req.token.userId;

  const job = new jobModel({
    title,
    description,
    date,
    expiryDate,
    image,
    company,
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

const getJobByCompany = (req, res) => {
  const companyName = req.params.id;
  console.log(req.params);

  console.log(companyName);

  jobModel
    .find({ company: companyName })
    .then((response) => {
      if (!response) {
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
const getJobByCategory = (req, res) => {
  const jobsCategory = req.params.id;
  console.log(req.params);

  jobModel
    .find({ category: jobsCategory })
    .then((response) => {
      console.log(response);
      if (!response) {
        res.status(404).json({
          success: false,
          message: "No job with this category",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Job Found for this category",
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
const updateJobByPublisher = (req, res) => {
  //const publisher = req.token.userId;
  const publisher = req.params.id;
  const { title, description } = req.body;

  jobModel
    .findOneAndUpdate({
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
module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getJobByCompany,
  getJobByCategory,
  updateJobByPublisher,
};
