const express = require("express");
const { signup, signin, requireSignin } = require("../controller/auth");
const {
  isRequestValidate,
  validateSignupRequest,
  validateSigninRequest,
} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidate, signup);
router.post("/signin", validateSigninRequest, isRequestValidate, signin);

router.get("/profile", requireSignin, (req, res) => {
  return res.status(200).json({
    message: "Weooow it's working",
  });
});

module.exports = router;
