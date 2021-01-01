const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("Firstname is required"),
  check("lastName").notEmpty().withMessage("Lastname is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength(6)
    .withMessage("Password must be at least 6 character long"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength(6)
    .withMessage("Password must be at least 6 character long"),
];

exports.isRequestValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    return res.status(400).json({ errors: errors.errors[0].msg });
  }
  next();
};
