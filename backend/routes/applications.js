const express = require("express");
const authentication = require("../middleware/authentication");

const appRouter = express.Router();

const { applyForJob, changeAppStatus } = require("../controllers/appiclaion");

appRouter.post("/apply/:id", authentication, applyForJob);
appRouter.post("/change/:id", changeAppStatus);

module.exports = appRouter;
