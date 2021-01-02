const User = require("../../models/auth");
const jwt = require("jsonwebtoken");
// const { use } = require("../../routes/admin/auth");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: "Admin already registered",
      });
    }

    const { firstName, lastName, password, email } = req.body;

    const _user = new User({
      firstName,
      lastName,
      password,
      email,
      username: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(200).json({
          message: "Admin Created successfully",
          user: data,
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        const {
          _id,
          firstName,
          lastName,
          password,
          email,
          username,
          role,
          fullName,
        } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            password,
            email,
            username,
            role,
            fullName,
          },
        });
      } else {
        res.status(400).json({
          message: "Invalid password",
        });
      }
    }

    return res.status(400).json({
      message: "Something went wrong",
    });
  });
};

// authorization token
exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);
  req.user = user;
  next();
};
