const express = require("express");

const { createRole } = require("../controllers/role");

const roleRouter = express.Router();

roleRouter.post("/new", createRole);

module.exports = roleRouter;
