const { Router } = require("express");
const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getProductById } = require("../controllers/product");
const { route } = require("./category");

router.param("userId", getUserById);
router.param("productId", getProductById);

module.exports = router;
