const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createJob,
  getAllJobs,
  getJobById,
  getJobByCompany,
  getJobsByCategory,
  updateJobByPublisher,
} = require("../controllers/job");
const { createComments } = require("../controllers/comment");
const jobRouter = express.Router();

jobRouter.post("/new", authentication, authorization("CREATE_JOB"), createJob);
jobRouter.get("/all", getAllJobs);
jobRouter.get("/job/:id", getJobById);
jobRouter.get("/company/:id", getJobByCompany);
jobRouter.get("/cateogry/:id", getJobsByCategory);
jobRouter.put("/job/update/:id", updateJobByPublisher);
jobRouter.post("/comment/:id", createComments);

module.exports = jobRouter;
