const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  expiryDate: { type: Date },

  company: { type: String },
  status: {
    type: String,
    enum: ["Open", "Expierd"],
    default: "Open",
  },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
 // applicatin: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
});

module.exports = mongoose.model("Job", jobSchema);
