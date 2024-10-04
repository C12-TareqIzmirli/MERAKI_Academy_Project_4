const express = require("express");

const { createCategory, getAllCategory } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/new", createCategory);
categoryRouter.get("/all", getAllCategory);

module.exports = categoryRouter;
