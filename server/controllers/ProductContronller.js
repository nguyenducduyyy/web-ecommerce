const Product = require('../models/product');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');

class ProductController {
  // Lấy danh sách sản phẩm
  show(req, res) {
    Product.find({})
      .then(products => res.json(products))
      .catch(err => res.status(400).json({ err }));
  }

  
  async store(req, res) {
    const product = new Product(req.body);
    
    try {
      const savedProduct = await product.save();
      res.status(201).send(savedProduct);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  

}

module.exports = new ProductController();
