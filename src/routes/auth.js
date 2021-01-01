const express = require("express");
const { signup, signin, requireSignin } = require("../controller/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/profile", requireSignin, (req, res) => {
  return res.status(200).json({
    message: "Weooow it's working",
  });
});

module.exports = router;
