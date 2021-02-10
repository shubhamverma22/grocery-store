const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		description: {
			type: String,
			required: true,
			maxlength: 1500,
		},
		price: {
			type: Number,
			required: true,
			maxlength: 32,
			trim: true,
		},
		//this is how we associate 1 schema to another schema by using ObjectId with the ref(reference).
		category: {
			type: ObjectId,
			ref: "Category",
			required: true,
		},
		stock: {
			type: Number,
		},
		sold: {
			type: Number,
			default: 0,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
