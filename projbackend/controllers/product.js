const Product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  //
  Product.findById(id).exec((err,product) => {
    if(err) {
      return res.status()
    }
  })
};
