const express = require("express");
const {
  signup,
  signin,
  requireSignin,
} = require("../../controller/admin/auth");
const router = express.Router();

router.post("/admin/signup", signup);
router.post("/admin/signin", signin);

router.get("/profile", requireSignin, (req, res) => {
  return res.status(200).json({
    message: "Weooow it's working",
  });
});

module.exports = router;
