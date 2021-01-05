const express = require("express");
const multer = require("multer");

const { adminMiddleware, requireSignin } = require("../common-middleware");
const { createProduct } = require("../controller/products");

// const { addCategory, getCategories } = require("../controller/category");
const router = express.Router();
const shortId = require("shortid");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(require.main.filename), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPictures"),
  createProduct
);
// router.get("/category/get", getCategories);

module.exports = router;
