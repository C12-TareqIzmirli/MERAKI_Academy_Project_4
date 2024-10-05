const express = require("express");

const {
  createCategory,
  getAllCategory,
  getCategoryByName,
  getAllJobForThisCategory,
} = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/new", createCategory);
categoryRouter.get("/all", getAllCategory);
categoryRouter.get("/name/:id", getCategoryByName);
categoryRouter.get("/cat/:id", getAllJobForThisCategory);

module.exports = categoryRouter;
