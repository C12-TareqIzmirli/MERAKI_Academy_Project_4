const appllyModel = require("../models/applications");

const applyForJob = (req, res) => {
  //console.log(req.token);

  const { cv } = req.body;
  const jobId = req.params.id;
  const date = new Date();
  const applicant = req.token.userId;

  const newApply = new appllyModel({
    applicant: applicant,
    job: jobId,
    date,
    cv,
  });

  newApply
    .save()
    .then((response) => {
      res.status(201).json({
        success: true,
        message: `successfully appiled`,
        apply: response,
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

module.exports = applyForJob;
