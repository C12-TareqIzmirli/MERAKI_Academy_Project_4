const express = require("express");
const authentication = require("../middleware/authentication");

const appRouter = express.Router();

const applyForJob = require("../controllers/appiclaion");

appRouter.post("/apply/:id", authentication, applyForJob);

module.exports = appRouter;
