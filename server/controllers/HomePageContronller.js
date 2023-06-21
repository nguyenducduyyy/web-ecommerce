const Product = require("../models/product");
class HomePageContronller {
  async showNewArrial(req, res) {
    try {
      Product.find({})
        .sort({ updatedAt: -1 }) // Sắp xếp theo trường updatedAt giảm dần
        .limit(8) // Giới hạn chỉ trả về 8 sản phẩm
        .then((products) => {
          res.send({ products });
        })
        .catch((err) => res.status(400).json({ error: err.message }));
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  async viewProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.send( product );
      
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}
module.exports = new HomePageContronller();
