const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  application: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 5);
});

module.exports = mongoose.model("User", userSchema);
