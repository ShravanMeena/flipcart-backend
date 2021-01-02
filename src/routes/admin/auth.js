const express = require("express");
const { signup, signin } = require("../../controller/admin/auth");
const {
  validateSignupRequest,
  isRequestValidate,
  validateSigninRequest,
} = require("../../validators/auth");
const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidate, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidate, signin);

// router.get("/profile", requireSignin, (req, res) => {
//   return res.status(200).json({
//     message: "Weooow it's working",
//   });
// });

module.exports = router;
