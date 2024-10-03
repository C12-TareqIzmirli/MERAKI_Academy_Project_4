const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  const { userName, email, phone, password, role, job, application } = req.body;

  const newUser = new userModel({
    userName,
    email,
    phone,
    password,
    role,
    job,
    application,
  }).populate("role");

  newUser
    .save()
    .then((response) => {
      res.status(201).json({
        sucsess: true,
        message: "Account Created Successfully",
        User: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        sucsess: false,
        message: "Server Error",
      });
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).populate("role");

    if (user) {
      const hashpass = user.password;
      const passworEqual = await bcrypt.compare(password, hashpass);

      if (passworEqual) {
        const payload = {
          userNamn: user.userName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          job: user.job,
          application: user.application,
        };
        const options = "10h";

        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          sucsess: true,
          message: "Valid Login credentials",
          token: token,
        });
      } else {
        res
          .status(403)
          .json(
            "  The email doesn’t exist or the password you’ve entered is incorrect"
          );
      }
    } else {
      res.status(404).json("No user Found");
    }
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
};

module.exports = { register, login };
