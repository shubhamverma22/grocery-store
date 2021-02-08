const Category = require("../models/category");
exports.getcategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, categ) => {
		if (err) {
			return res.status(400).json({
				error: "Category not found in DB",
			});
		}
		req.category = categ;
		next();
	});
};

exports.createCategory = (req, res) => {
	const category = new Category(req.body);
	category.save((err, categ) => {
		if (err) {
			return res.status(400).json({
				error: "NOT able to save category in DB",
			});
		}
		res.json({ categ });
	});
};

exports.getAllCategories = (req, res) => {
	Category.find().exec((err, categ) => {
		if (err || !categ) {
			return res.status(400).json({
				error: "Could'nt Find any Category is DB",
			});
		}
		res.json({ categ });
	});
};

exports.getCategory = (req, res) => {
	return res.json(req.category);
};

exports.updateCategory = (req, res) => {
	const category = req.category; //req.category is fetched from middleware
	category.name = req.body.name;
	category.save((err, updateCategory) => {
		if (err) {
			return res.status(400).json({
				error: "Failed To update Category",
			});
		}
		res.json(updateCategory);
	});
};

exports.deleteCategory = (req, res) => {
	const category = req.category;
	category.remove((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to delete this category",
			});
		}
		res.json({
			message: `${category} is Successfully Deleted`,
		});
	});
};
