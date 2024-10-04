const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        sucsess: false,
        message: "Forbidden",
      });
    }
    const token = req.headers.authorization.split(" ").pop();

    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: `The token is invalid or expired`,
        });
      } else {
        (req.token = result), next();
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};
moudle.exports = authentication;
