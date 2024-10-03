const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  Comment: { type: String, required: true },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
});

module.exports = mongoose.model("Comment", commentsSchema);
