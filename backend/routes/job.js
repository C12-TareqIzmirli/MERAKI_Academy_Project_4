const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createJob,
  getAllJobs,
  getJobById,
  getJobsByCompany,
  getJobsByCategory,
  updateJobByPublisher,
  getJobByName,
  deleteJobById,
} = require("../controllers/job");
const {
  createComments,
  deleteComment,
  updateComment,
} = require("../controllers/comment");
const jobRouter = express.Router();

jobRouter.post("/new", authentication, authorization("CREATE_JOB"), createJob);
jobRouter.get("/all", getAllJobs);
jobRouter.get("/job/:id", getJobById);
jobRouter.get("/company/:id", getJobsByCompany);
jobRouter.get("/title/:id", getJobByName);
jobRouter.get("/cateogry/:id", getJobsByCategory);
jobRouter.put(
  "/job/update/:id",
  authentication,
  authorization("Update_Job"),
  updateJobByPublisher
);
jobRouter.post("/comment/:id", createComments);
jobRouter.delete("/comment/remove/:id/:jobId", deleteComment);
jobRouter.put("/comment/update/:id", updateComment);
jobRouter.delete(
  "/remove/:id",
  authentication,
  authorization("Delete_Job"),
  deleteJobById
);

module.exports = jobRouter;
