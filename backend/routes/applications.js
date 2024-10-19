const express = require("express");
const authentication = require("../middleware/authentication");

const appRouter = express.Router();

const {
  applyForJob,
  changeAppStatus,
  getAppForThisJob,
} = require("../controllers/appiclaion");

appRouter.post("/apply/:id", authentication, applyForJob);
appRouter.post("/change/:id", changeAppStatus);
appRouter.get("/app/:id", getAppForThisJob);

module.exports = appRouter;
