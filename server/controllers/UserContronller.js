const User = require("../models/user");

class UserContronller {
  async getInfoUser(req, res) {
    try {
      const userId = req.params.id;

      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }

      // Kiểm tra xem người dùng đã hoàn thiện thông tin hay chưa
      
        return res.status(200).json({ user });
      

      // Gửi thông tin người dùng về cho client
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }


  async updateUser(req, res) {
    try {
      const userId = req.body.userId;
      const updatedData = req.body.updatedData;
  
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
  
      // Cập nhật thông tin người dùng
      user.name = updatedData.name || user.name;
      user.email = updatedData.email || user.email;
      user.phone = updatedData.phone || user.phone;
  
      // Cập nhật địa chỉ
      if (updatedData.address) {
        user.address.push(updatedData.address); // Thêm địa chỉ mới vào mảng
      }
  
      // Kiểm tra xem các trường bắt buộc đã được nhập đủ
      if (
        updatedData.name &&
        updatedData.email &&
        updatedData.phone &&
        updatedData.address.length > 0
        // Kiểm tra các trường thông tin khác (nếu có)
      ) {
        user.infoCompleted = true; // Đánh dấu thông tin người dùng đã được hoàn thiện
      }
  
      // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
      await user.save();
  
      // Gửi thông tin người dùng đã được cập nhật về cho client
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  async deleteAddress(req, res) {
    try {
      
      const userId = req.params.id;
      const addressIndex = req.params.index;
  
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
  
      // Kiểm tra xem index của địa chỉ có hợp lệ không
      if (addressIndex < 0 || addressIndex >= user.address.length) {
        return res.status(400).json({ error: "Index của địa chỉ không hợp lệ" });
      }
  
      // Xóa địa chỉ khỏi mảng
      user.address.splice(addressIndex, 1);
  
      // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
      await user.save();
  
      // Gửi thông tin người dùng đã được cập nhật về cho client
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  
  
}

module.exports = new UserContronller();
