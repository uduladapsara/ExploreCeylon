import express from "express";
import { createTour, getTours, getTourById } from "../controllers/tour.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getTours);
router.get("/:id", getTourById);
router.post("/", protect, adminOnly, createTour);

export default router;