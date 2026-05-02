import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
  date: Date,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);