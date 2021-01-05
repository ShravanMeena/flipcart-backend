const jwt = require("jsonwebtoken");

// authorization token
exports.requireSignin = (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];
  // jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
  //   if (err) {
  //     console.log("===============error start=====================");
  //     console.log(err.message);
  //     console.log("=================error end===================");
  //   } else {
  //     console.log("=================decoded start===================");
  //     console.log(decoded);
  //     console.log("=================decoded end===================");
  //   }
  // });

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      } else {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
      }
    });

    // const user = jwt.verify(token, process.env.SECRET_KEY);
    // req.user = user;
  } else {
    return res.status(400).json({
      message: "Authorization required!",
    });
  }
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({
      message: "User Access Denied!",
    });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({
      message: "Admin Access Denied!",
    });
  }
  next();
};
