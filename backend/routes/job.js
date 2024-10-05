const express = require("express");

const {
  createJob,
  getAllJobs,
  getJobById,
  getJobByCompany,
} = require("../controllers/job");

const jobRouter = express.Router();

jobRouter.post("/new", createJob);
jobRouter.get("/all", getAllJobs);
jobRouter.get("/job/:id", getJobById);
jobRouter.get("/company/:id", getJobByCompany);

module.exports = jobRouter;
