const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all cars with filtering
router.get('/', async (req, res) => {
  try {
    const { brand, type, minPrice, maxPrice } = req.query;
    let query = {};
    if (brand) query.brand = { $regex: brand, $options: 'i' };
    if (type) query.type = type;
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }
    const cars = await Car.find(query);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin Routes
router.post('/', protect, admin, async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;