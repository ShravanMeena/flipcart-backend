const express = require("express");
const { userMiddleware, requireSignin } = require("../common-middleware");

const { addItemToCart } = require("../controller/cart");
const router = express.Router();

router.post("/cart/create", requireSignin, userMiddleware, addItemToCart);
// router.get("/category/get", getCategories);

module.exports = router;
