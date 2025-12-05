const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/authMiddleware');

// Create Booking
router.post('/', protect, async (req, res) => {
  try {
    const { car, startDate, endDate, pickupLocation, dropLocation, totalPrice } = req.body;
    const booking = await Booking.create({
      user: req.user._id,
      car, startDate, endDate, pickupLocation, dropLocation, totalPrice
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// My Bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('car');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Get all bookings
router.get('/', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user').populate('car');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Status
router.put('/:id/status', protect, async (req, res) => {
  try {
    // Users can cancel their own, Admins can do anything
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(404).json({message: 'Booking not found'});

    if(req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({message: 'Not authorized'});
    }

    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;