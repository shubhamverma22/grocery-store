const User = require("../models/user");
const Orders = require("../models/order");

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "No User found in DB",
			});
		}
		req.profile = user;
		next();
	});
};

exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	req.profile.createdAt = undefined;
	req.profile.updatedAt = undefined;
	return res.json(req.profile);
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				return res.status(400).json({
					error: "You're not Authorised to update the information",
				});
			}
			user.salt = undefined;
			user.encry_password = undefined;
			res.json(user);
		}
	);
};

exports.userPurchaseList = (req, res) => {
	Orders.find({ user: req.profile._id })			//req.profile._id is comes up from the middleware getUserById which is having params to get id from url
		.populate("user", "_id name")
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: "No Order in this Account",
				});
			}
			return res.json(order);		//entire order object is return 
		});
};

exports.pushOrderInPurchaseList = (req, res, next) => {
	let purchases = [];
	req.body.order.products.forEach((product) => {
		purchases.push({
			_id: product._id,
			name: product.name,
			description: product.description,
			category: product.category,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id,
		});
	});

	//store in db
	//We're gonna use findOneAndUpdate because if something is already there than it cant override it
	User.findOneAndUpdate(
		{ _id: req.profile._id },	//symbolise user id which logged in
		{ $push: { purchases: purchases } },
		{ new: true }, //It helps to send the object which is updated not the older one
		(err, purchases) => {
			if (err) {
				return res.status(400).json({
					error: "Unable to save purchase list",
				});
			}
			next();
		}
	);
};
