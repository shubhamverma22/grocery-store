const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
	getProductById,
	createProduct,
	getProduct,
	getPhoto,
	deleteProduct,
	updateProduct,
} = require("../controllers/product");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
router.post(
	"/product/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createProduct
);

//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getPhoto);

//update routes
router.put(
	"/product/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAuthenticated,
	updateProduct
);

//delete routes
router.delete(
	"/product/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAuthenticated,
	deleteProduct
);
//listing routes

module.exports = router;
