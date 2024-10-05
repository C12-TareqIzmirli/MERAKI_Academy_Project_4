const express = require("express");

const appRouter = express.Router();

const applyForJob = require("../controllers/appiclaion");

appRouter.post("/apply/:id", applyForJob);

module.exports = appRouter;
