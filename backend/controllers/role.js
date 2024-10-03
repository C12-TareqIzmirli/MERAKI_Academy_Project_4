const roleModel = require("../models/role");

const createRole = (req, res) => {
  const { role, permissions } = req.body;

  const newRole = new roleModel({
    role,
    permissions,
  });

  newRole
    .save()
    .then(() => {
      res.status(201).json("Role Created");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { createRole };
