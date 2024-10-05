const express = require("express");

const { createJob, getAllJobs } = require("../controllers/job");

const jobRouter = express.Router();

jobRouter.post("/new", createJob);
jobRouter.get("/all", getAllJobs);

module.exports = jobRouter;
