const { response } = require("express");
const categoryModel = require("../models/category");
const category = require("../models/category");

const createCategory = (req, res) => {
  const { title, description } = req.body;

  const newCat = new categoryModel({
    title,
    description,
  });

  newCat
    .save()
    .then((response) => {
      res.status(201).json({
        sucsess: true,
        message: "Category Created",
        category: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        sucsess: false,
        message: "Server Error",
      });
    });
};

const getAllCategory = (req, res) => {
  categoryModel
    .find({})
    .then((response) => {
      res.status(200).json({
        sucsess: true,
        message: "All Category ",
        category: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { createCategory, getAllCategory };
