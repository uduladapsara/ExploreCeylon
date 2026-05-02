import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user._id,
    ...req.body
  });
  res.json(booking);
};

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  booking.status = req.body.status;
  await booking.save();
  res.json(booking);
};