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
    .find()
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

const getCategoryByName = (req, res) => {
  const categoryName = req.params.id;
  console.log(req.params);

  categoryModel
    .find({ title: categoryName })
    .then((response) => {
      if (!response) {
        res.status(404).json({
          success: false,
          message: "No Category",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Category Found",
          category: response,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};
const getAllJobForThisCategory = (req, res) => {
  const category = req.params.id;
  //console.log(jobsCategory);

  categoryModel
    .find({ job: category })
    .then((response) => {
      console.log(response);
      if (!response) {
        res.status(404).json({
          success: false,
          message: "No jobs with this category",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Job Found for this category",
          job: response,
        });
      }
    })

    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryByName,
  getAllJobForThisCategory,
};
