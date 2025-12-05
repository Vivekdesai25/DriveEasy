const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  seats: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  availabilityStatus: { type: String, default: 'available' },
  location: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Car', CarSchema);