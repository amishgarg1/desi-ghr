const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['Breakfast & Snacks', 'Chutney', 'Roti', 'Raita', 'Rice', 'Sweet', 'Sabji', 'Combo']
  },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: 'Fresh and homemade' },
  isAvailable: { type: Boolean, default: true },
  image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
