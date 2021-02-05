const express = require("express");
const router = express.Router();

const {
	getcategoryById,
	createCategory,
	getAllCategories,
	getCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("categoryId", getcategoryById);

//actual route goes here:

//create route
router.post(
	"/category/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createCategory
);


//Read Routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);


//update Route
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated)

//delete Route


module.exports = router;
