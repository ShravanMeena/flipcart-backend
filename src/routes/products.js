const express = require("express");
const { adminMiddleware, requireSignin } = require("../common-middleware");

// const { addCategory, getCategories } = require("../controller/category");
const router = express.Router();
const Product = require("../models/product");

router.post("/product/create", requireSignin, adminMiddleware, (req, res) => {
  return res.status(200).json({
    messsge: "Product created",
  });
});
// router.get("/category/get", getCategories);

module.exports = router;
