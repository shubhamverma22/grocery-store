const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Product not found",
				});
			}
			req.product = product;
			next();
		});
};

exports.createProduct = (req, res) => {
	//
	let form = formidable.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "Some Problem with image",
			});
		}

		//destructure the fields
		const { name, description, price, category, stock } = fields;
		if (!name || !description || !price || !category || !stock) {
			return res.status(400).json({
				error: "Please Include all Fields",
			});
		}
		let product = new Product(fields);

		//handle file here:
		if (file.photo) {
			if (file.photo.size > 3097152) {
				return res.status(400).json({
					error: "File Size is too big",
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}

		//save to db
		product.save((err, item) => {
			if (err) {
				return res.status(400).json({
					error: "Saving Product in DB is failed",
				});
			}
			return res.json(item);
		});
	});
};

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

//middleware  this is just for performance optimization
exports.getPhoto = (req, res, next) => {
	if (req.product.photo.data) {
		res.set("Content-Type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

exports.updateProduct = (req, res) => {
	//
};

exports.deleteProduct = (req, res) => {
	//
	let product = req.product;
	product.remove((err, deletedProduct) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to delete the Product",
			});
		}
		res.json({
			message: "Deletion was Success",
			deletedProduct,
		});
	});
};
