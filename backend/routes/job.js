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
  GetJobByPublisher,
  changeStatus,
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
jobRouter.get("/:title", getJobByName);
jobRouter.get("/cateogry/:id", getJobsByCategory);
jobRouter.get("/publisher/:id", GetJobByPublisher);
jobRouter.put(
  "/job/update/:id",
  authentication,
  authorization("Update_Job"),
  updateJobByPublisher
);
jobRouter.post("/change/:id", changeStatus);
jobRouter.post("/comment/:id", authentication, createComments);
jobRouter.delete("/comment/remove/:id/:jobId", deleteComment);
jobRouter.put("/comment/update/:id/", updateComment);
jobRouter.delete(
  "/remove/:id",
  authentication,
  authorization("Delete_Job"),
  deleteJobById
);

module.exports = jobRouter;
