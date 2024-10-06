const appllyModel = require("../models/applications");

const applyForJob = (req, res) => {
  //console.log(req.token);

  const { attatchments, status } = req.body;
  const jobId = req.params.id;
  const date = new Date();
  const applicant = req.token.userId;

  const newApply = new appllyModel({
    applicant: applicant,
    job: jobId,
    date,
    status,
    attatchments,
  });

  //  appllyModel.find({applicant:app})
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

const changeAppStatus = (req, res) => {
  const appId = req.params.id;

  appllyModel
    .findByIdAndUpdate(appId, { status: "Reviewed" })
    .then((response) => {
      if (!response) {
        res.status(200).json({
          success: false,
          message: "No application to Review",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Status changed",
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
module.exports = { applyForJob, changeAppStatus };
