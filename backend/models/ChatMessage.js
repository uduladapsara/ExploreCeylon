import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    source: { type: String, default: "web" }
  },
  { timestamps: true }
);

export default mongoose.model("ChatMessage", chatMessageSchema);
