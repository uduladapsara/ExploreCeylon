import express from "express";
import { createBooking, updateBookingStatus } from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.put("/:id", protect, updateBookingStatus);

export default router;