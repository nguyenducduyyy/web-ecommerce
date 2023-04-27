const ImageProduct = require('../models/imageProduct');

class ImageProductController {
  async createImageProduct(req, res) {
    try {
      const newImageProduct = new ImageProduct({
        filename: req.files.filename,
        originalName: req.files.originalname,
        contentType: req.files.mimetype,
        size: req.files.size,
        productId: req.body.productId // Lấy productId từ request body
      });
      
      const savedImageProduct = await newImageProduct.save();
    
    } catch (error) {
      res.status(400).send(error);
    }
  }
 
}

module.exports = new ImageProductController();
