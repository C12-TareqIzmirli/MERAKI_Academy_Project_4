const { response } = require("express");
const commentModel = require("../models/comments");
const jobModel = require("../models/jobSchema");

const createComments = (req, res) => {
  const { comment, publisher } = req.body;
  // const commenter = req.token.userId;
  const jobId = req.params.id;

  const newComment = new commentModel({
    comment: comment,
    publisher: publisher,
  });

  newComment
    .save()
    .then((response) => {
      jobModel
        .findByIdAndUpdate(
          { _id: jobId },
          { $push: { comments: response._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            sucsess: true,
            message: "Comment Added",
            comment: response,
          });
        })
        .catch((err) => {
          res.status(500).json({
            sucsess: false,
            message: "Server Error",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        sucsess: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

module.exports = { createComments };
