const Order = require("../models/order");
const User = require("../models/user");


class OrderController {
  async createOrder(req, res) {
    const orderData = req.body;
    try {
      const newOrder = new Order(orderData);
      const savedOrder = await newOrder.save();
      
      const user = await User.findById(orderData.userId);
      user.cart = []; // Xóa giỏ hàng cũ
      await user.save();

      const io = req.app.get('socketio'); // Lấy biến io từ app
     io.emit('ORDER_CREATED', { orderId: savedOrder._id }); // Gửi thông báo qua socket
      
      return res.status(200).json(savedOrder);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async getOrder(req, res) {
    try {
      const orders = await Order.find().populate("userId")
       // Lấy tất cả các đơn hàng từ CSDL
      return res.status(200).json(orders); // Trả về dữ liệu đơn hàng dưới dạng JSON
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  async updateOrderStatus(req, res) {
    const { orderId, newStatus } = req.body;
    console.log(req.body);
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: newStatus ,createdAt: new Date()},
        { new: true }
      );
      await order.save();
      return res.status(200).json({ message: "Status updated", status: order.status });
      
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

}

 
module.exports = new OrderController();
