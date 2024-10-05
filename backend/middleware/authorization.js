const authorization = (permissions) => {
  return (req, res, next) => {
    const token = req.token;
    console.log(token);

    const permission = token.role.permissions;
    console.log(permission);

    if (permission.includes(permissions)) {
      next();
    } else {
      res.status(403).json("Unauthorized");
    }
  };
};

module.exports = authorization;

// const authorization = (string) => {
//   return (req, res, next) => {
//     if (req.token.role.permissions.includes(string)) {
//       next();
//     } else {
//       return res.status(403).json({
//         success: true,
//         message: `Unauthorized`,
//       });
//     }
//   };
// };

// module.exports = authorization;
