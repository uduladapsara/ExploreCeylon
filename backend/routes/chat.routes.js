import express from "express";
import { createMessage, getMessages } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/messages", getMessages);
router.post("/messages", createMessage);

export default router;
