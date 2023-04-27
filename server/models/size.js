const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 }
}, { timestamps: true });

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;

