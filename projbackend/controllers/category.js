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
