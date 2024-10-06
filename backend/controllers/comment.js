const { response } = require("express");
const commentModel = require("../models/comments");
const jobModel = require("../models/jobSchema");
const comments = require("../models/comments");
//const comments = require("../models/comments");

const createComments = (req, res) => {
  const { comment } = req.body;
  const commenter = req.token.userId;
  const jobId = req.params.id;

  const newComment = new commentModel({
    comment: comment,
    commenter: commenter,
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
const deleteComment = (req, res) => {
  const commentId = req.params.id;
  const jobId = req.params.jobId;

  //console.log(commentId);

  commentModel
    .findById(commentId)
    .then((response) => {
      console.log(response);
      jobModel
        .findByIdAndUpdate(
          { _id: jobId },
          {
            $pull: { comments: commentId },
          },
          { new: true }
        )
        .then((result) => {
          if (!response) {
            res.status(201).json({
              sucsess: false,
              message: "No Comment to delete",
            });
          } else {
            res.status(201).json({
              sucsess: true,
              message: "Comment deleted",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            sucsess: false,
            message: "Server Error",
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        sucsess: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const updateComment = (req, res) => {
  const commentId = req.params.id;
  const comment = req.body;

  commentModel
    .findById(commentId)
    .then((response) => {
      res.status(200).json({
        sucsess: true,
        message: "Comment Updated",
        comment: response,
      });
    })
    .catch((err) => {
      res.status(201).json({
        sucsess: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

module.exports = { createComments, deleteComment, updateComment };
