const express = require("express");
const { adminMiddleware, requireSignin } = require("../common-middleware");

const { addCategory, getCategories } = require("../controller/category");
const router = express.Router();

router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/get", getCategories);

module.exports = router;
