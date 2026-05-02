import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import tourRoutes from "./routes/tour.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import ChatMessage from "./models/ChatMessage.js";

import { notFound, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const allowedOrigins = process.env.CLIENT_ORIGIN
	? process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim())
	: "*";

const io = new Server(server, {
	cors: {
		origin: allowedOrigins,
		methods: ["GET", "POST"]
	}
});

app.set("io", io);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const getBotReply = (text) => {
	const message = text.toLowerCase();
	if (message.includes("price") || message.includes("cost")) {
		return "Our luxury packages start from $390. Share your dates for a tailored quote.";
	}
	if (message.includes("beach") || message.includes("coast")) {
		return "Mirissa and Bentota are guest favorites. Do you prefer a quiet or vibrant beach?";
	}
	if (message.includes("mountain") || message.includes("ella") || message.includes("tea")) {
		return "Ella and Nuwara Eliya deliver misty tea-country escapes. Want a 2-night or 3-night stay?";
	}
	if (message.includes("safari") || message.includes("yala")) {
		return "We can arrange a private Yala safari with a naturalist guide. Interested in sunrise or sunset?";
	}
	return "Wonderful choice. Tell us your travel dates and the experiences you love most.";
};

const getGeminiReply = async (text) => {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) return null;

	const prompt =
		"You are ExploreCeylon concierge. Reply in 1-2 sentences, warm and helpful, about Sri Lanka travel. " +
		"If asked for distance/time, say it depends on route and offer to plan. Question: " +
		text;

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 8000);

	try {
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [{ role: "user", parts: [{ text: prompt }] }],
					generationConfig: { temperature: 0.7, maxOutputTokens: 120 }
				}),
				signal: controller.signal
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.warn("Gemini error:", response.status, errorText.slice(0, 200));
			return null;
		}

		const data = await response.json();
		return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
	} catch (error) {
		console.warn("Gemini request failed:", error?.message || error);
		return null;
	} finally {
		clearTimeout(timeout);
	}
};

io.on("connection", (socket) => {
		socket.on("chat:send", async (payload) => {
		if (!payload?.message) return;
		const created = await ChatMessage.create({
			name: payload.name,
			email: payload.email,
			message: payload.message,
			source: "socket"
		});
		io.emit("chat:message", created);
			const aiReply = await getGeminiReply(payload.message);
			const botMessage = await ChatMessage.create({
				message: aiReply || getBotReply(payload.message),
				source: "bot"
			});
		io.emit("chat:message", botMessage);
	});
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));