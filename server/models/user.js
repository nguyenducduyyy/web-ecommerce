const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  infoCompleted: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Các trường thông tin khác của người dùng
  address: {
    type: String,
  
  },
  phone: {
    type: String,
   
  },
  name:{
    type: String,
   
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
