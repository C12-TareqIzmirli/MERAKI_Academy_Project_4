const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {
  createCategory,
  getAllCategory,
  getCategoryByName,
} = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/new", authentication, authorization, createCategory);
categoryRouter.get("/all", getAllCategory);
categoryRouter.get("/name/:id", getCategoryByName);

module.exports = categoryRouter;
