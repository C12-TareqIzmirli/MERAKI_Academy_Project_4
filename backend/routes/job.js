const express = require("express");

const {
  createJob,
  getAllJobs,
  getJobById,
  getJobByCompany,
  getJobByCategory,
  updateJobByPublisher,
} = require("../controllers/job");
const { createComments } = require("../controllers/comment");
const jobRouter = express.Router();

jobRouter.post("/new", createJob);
jobRouter.get("/all", getAllJobs);
jobRouter.get("/job/:id", getJobById);
jobRouter.get("/company/:id", getJobByCompany);
jobRouter.get("/cateogry/:id", getJobByCategory);
jobRouter.put("/job/update/:id", updateJobByPublisher);
jobRouter.post("/comment/:id", createComments);

module.exports = jobRouter;
