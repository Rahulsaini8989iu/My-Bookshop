const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  writer: { type: String },
  description: { type: String },
  category: { type: String },
  price: { type: Number },
  writerImage: { type: String },
  images: [{ type: String }],
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
