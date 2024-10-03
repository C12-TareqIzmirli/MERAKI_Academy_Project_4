const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  Date: { type: Date, required: true },
  expiryDate: { type: Date },
  image: { type: String },
  company: { type: String },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Job", jobSchema);
