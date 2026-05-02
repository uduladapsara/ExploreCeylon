import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  price: Number,
  description: String,
  images: [String],
  availableDates: [Date]
}, { timestamps: true });

export default mongoose.model("Tour", tourSchema);