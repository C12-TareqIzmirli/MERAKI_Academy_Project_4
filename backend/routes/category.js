const express = require("express");

const {
  createCategory,
  getAllCategory,
  getCategoryByName,
} = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/new", createCategory);
categoryRouter.get("/all", getAllCategory);
categoryRouter.get("/name/:id", getCategoryByName);

module.exports = categoryRouter;
