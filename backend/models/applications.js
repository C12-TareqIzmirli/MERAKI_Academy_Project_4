const mongoose = require("mongoose");

const applicationsSchema = new mongoose.Schema({
  applicant: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  date: { type: Date, required: true },
  cv: [{ type: String, required: true }],
});

module.exports = mongoose.model("Application", applicationsSchema);
